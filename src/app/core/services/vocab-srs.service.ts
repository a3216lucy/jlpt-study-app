// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import {
  Firestore,
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from '@angular/fire/firestore';
// Models
import type { SRSStage, VocabSRSRecord } from '@core/models/study-plan.model';

const LEARNED_THRESHOLD = 21;
const DEFAULT_EASE = 2.5;

/** 根據作答結果計算下次 SRS 參數 */
function computeNext(
  record: VocabSRSRecord | null,
  known: boolean,
): Pick<VocabSRSRecord, 'interval' | 'dueDate' | 'easeFactor' | 'stage'> {
  const today = todayStr();
  const ease = record?.easeFactor ?? DEFAULT_EASE;
  const reps = record?.reps ?? 0;

  let interval: number;
  let newEase = ease;

  if (!known) {
    interval = 1;
    newEase = Math.max(1.3, ease - 0.2);
  } else if (reps === 0) {
    interval = 1;
  } else if (reps === 1) {
    interval = 3;
  } else {
    interval = Math.min(Math.round((record?.interval ?? 1) * ease), 30);
    newEase = Math.min(ease + 0.1, 3.0);
  }

  const stage: SRSStage = !known
    ? 'learning'
    : interval >= LEARNED_THRESHOLD
      ? 'learned'
      : reps === 0
        ? 'new'
        : 'learning';

  return {
    interval,
    dueDate: addDays(today, interval),
    easeFactor: newEase,
    stage,
  };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root' })
export class VocabSrsService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  async getRecords(uid: string, planId: string): Promise<Map<string, VocabSRSRecord>> {
    const snap = await runInInjectionContext(this.injector, () =>
      getDocs(
        query(
          collection(this.firestore, `users/${uid}/vocabRecords`),
          where('planId', '==', planId),
        ),
      ),
    );
    const map = new Map<string, VocabSRSRecord>();
    snap.docs.forEach((d) => map.set(d.id, d.data() as VocabSRSRecord));
    return map;
  }

  async updateRecord(
    uid: string,
    wordId: string,
    planId: string,
    level: string,
    known: boolean,
    existing: VocabSRSRecord | null,
  ): Promise<VocabSRSRecord> {
    const today = todayStr();
    const next = computeNext(existing, known);

    const updated: VocabSRSRecord = {
      wordId,
      planId,
      level,
      interval: next.interval,
      dueDate: next.dueDate,
      easeFactor: next.easeFactor,
      stage: next.stage,
      reps: (existing?.reps ?? 0) + 1,
      knownCount: (existing?.knownCount ?? 0) + (known ? 1 : 0),
      wrongCount: (existing?.wrongCount ?? 0) + (known ? 0 : 1),
      lastReviewed: today,
    };

    await runInInjectionContext(this.injector, () =>
      setDoc(doc(this.firestore, `users/${uid}/vocabRecords/${wordId}`), updated),
    );

    return updated;
  }
}
