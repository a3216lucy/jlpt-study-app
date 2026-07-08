// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
// Shared
import { PAST_EXAM_CATALOG } from '@shared/config/past-exam-catalog';
import type { StudyPlan, VocabSRSRecord } from '@shared/models/study-plan.model';
// Models
import type { ExamHistoryEntry, StudyPlanStats, VocabStats } from './profile.model';

@Injectable()
export class ProfileService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // profilePage
  // --------------------------------------------------------------------
  async getExamHistory(uid: string): Promise<ExamHistoryEntry[]> {
    const snap = await runInInjectionContext(this.injector, () =>
      getDocs(
        query(
          collection(this.firestore, `users/${uid}/examHistory`),
          orderBy('completedAt', 'desc'),
          limit(20),
        ),
      ),
    );

    return snap.docs.map((d) => {
      const data = d.data() as Omit<ExamHistoryEntry, 'id' | 'examLabel' | 'sectionLabel'>;
      const catalogEntry = PAST_EXAM_CATALOG.find((e) => e.id === data.examId);
      const section = catalogEntry?.sections.find((s) => s.id === data.sectionId);
      return {
        ...data,
        id: d.id,
        examLabel: catalogEntry?.examLabel ?? data.examId,
        sectionLabel: section?.sectionLabel ?? data.sectionId,
      };
    });
  }

  async getVocabStats(uid: string): Promise<VocabStats> {
    const [sessionSnap, recordsSnap] = await Promise.all([
      runInInjectionContext(this.injector, () =>
        getDocs(collection(this.firestore, `users/${uid}/vocabSessions`)),
      ),
      runInInjectionContext(this.injector, () =>
        getDocs(collection(this.firestore, `users/${uid}/vocabRecords`)),
      ),
    ]);

    return {
      totalSessions: sessionSnap.size,
      knownWords: recordsSnap.size,
    };
  }

  async getStudyPlanStats(uid: string): Promise<StudyPlanStats[]> {
    const plansSnap = await runInInjectionContext(this.injector, () =>
      getDocs(
        query(
          collection(this.firestore, `users/${uid}/studyPlans`),
          where('status', '!=', 'completed'),
        ),
      ),
    );

    const plans = plansSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudyPlan);
    const today = new Date().toISOString().slice(0, 10);

    const statsPromises = plans.map(async (plan) => {
      const recordsSnap = await runInInjectionContext(this.injector, () =>
        getDocs(
          query(
            collection(this.firestore, `users/${uid}/vocabRecords`),
            where('planId', '==', plan.id),
          ),
        ),
      );

      const records = recordsSnap.docs.map((d) => d.data() as VocabSRSRecord);
      const learnedCount = records.filter((r) => r.stage === 'learned').length;
      const learningCount = records.filter((r) => r.stage === 'learning').length;
      const newCount = plan.totalWords - records.length;
      const dueToday = records.filter((r) => r.dueDate <= today).length;
      const newToday = Math.max(plan.dailyNewWords - records.filter((r) => r.lastReviewed === today && r.reps === 1).length, 0);

      return {
        plan,
        newCount: Math.max(newCount, 0),
        learningCount,
        learnedCount,
        dueToday,
        newToday: Math.min(newToday, Math.max(newCount, 0)),
      } satisfies StudyPlanStats;
    });

    return Promise.all(statsPromises);
  }
}
