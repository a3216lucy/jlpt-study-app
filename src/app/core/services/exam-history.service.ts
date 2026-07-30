// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, collection, getDocs, limit, orderBy, query } from '@angular/fire/firestore';
// Shared
import { PAST_EXAM_CATALOG } from '@core/config/past-exam-catalog';
import type { ExamHistoryEntry } from '@core/models/exam-history.model';

@Injectable({ providedIn: 'root' })
export class ExamHistoryService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  async getRecent(uid: string, count = 20): Promise<ExamHistoryEntry[]> {
    const snap = await runInInjectionContext(this.injector, () =>
      getDocs(
        query(
          collection(this.firestore, `users/${uid}/examHistory`),
          orderBy('completedAt', 'desc'),
          limit(count),
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
}
