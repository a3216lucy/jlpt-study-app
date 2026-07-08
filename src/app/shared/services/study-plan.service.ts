// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
// Models
import type { StudyPlan, StudyPlanStatus } from '@shared/models/study-plan.model';

const LEVEL_DATA_MAP: Record<string, string> = {
  N3: 'assets/data/vocab-review-n3.json',
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root' })
export class StudyPlanService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  async getPlans(uid: string): Promise<StudyPlan[]> {
    const snap = await runInInjectionContext(this.injector, () =>
      getDocs(
        query(
          collection(this.firestore, `users/${uid}/studyPlans`),
          where('status', '!=', 'completed'),
        ),
      ),
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudyPlan);
  }

  async createPlan(
    uid: string,
    opts: { level: string; dailyNewWords: number; totalWords: number },
  ): Promise<StudyPlan> {
    const today = todayStr();
    const daysNeeded = Math.ceil(opts.totalWords / opts.dailyNewWords);
    const endDate = addDays(today, daysNeeded);
    const dataPath = LEVEL_DATA_MAP[opts.level] ?? '';

    const data: Omit<StudyPlan, 'id'> = {
      level: opts.level,
      dataPath,
      dailyNewWords: opts.dailyNewWords,
      totalWords: opts.totalWords,
      startDate: today,
      endDate,
      status: 'active',
      createdAt: Timestamp.now(),
    };

    const ref = await runInInjectionContext(this.injector, () =>
      addDoc(collection(this.firestore, `users/${uid}/studyPlans`), data),
    );

    return { id: ref.id, ...data };
  }

  async setPlanStatus(uid: string, planId: string, status: StudyPlanStatus): Promise<void> {
    await runInInjectionContext(this.injector, () =>
      updateDoc(doc(this.firestore, `users/${uid}/studyPlans/${planId}`), { status }),
    );
  }
}
