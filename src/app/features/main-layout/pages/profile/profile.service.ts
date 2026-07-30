// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
// Shared
import { ExamHistoryService } from '@core/services/exam-history.service';
import { StudyPlanStatsService } from '@core/services/study-plan-stats.service';
// Models
import type { ExamHistoryEntry, StudyPlanStats, VocabStats } from './profile.model';

@Injectable()
export class ProfileService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private examHistoryService = inject(ExamHistoryService);
  private studyPlanStatsService = inject(StudyPlanStatsService);

  // profilePage
  // --------------------------------------------------------------------
  async getExamHistory(uid: string): Promise<ExamHistoryEntry[]> {
    return this.examHistoryService.getRecent(uid, 20);
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
    return this.studyPlanStatsService.getStats(uid);
  }
}
