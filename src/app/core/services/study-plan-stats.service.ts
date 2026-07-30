// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
// Shared
import { StudyPlanService } from '@core/services/study-plan.service';
import type { StudyPlan, StudyPlanStats, VocabSRSRecord } from '@core/models/study-plan.model';

@Injectable({ providedIn: 'root' })
export class StudyPlanStatsService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private planService = inject(StudyPlanService);

  // general
  // --------------------------------------------------------------------
  async getStats(uid: string): Promise<StudyPlanStats[]> {
    const plans = await this.planService.getPlans(uid);
    const today = new Date().toISOString().slice(0, 10);

    const statsPromises = plans.map(async (plan: StudyPlan) => {
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
      const newToday = Math.max(
        plan.dailyNewWords - records.filter((r) => r.lastReviewed === today && r.reps === 1).length,
        0,
      );

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
