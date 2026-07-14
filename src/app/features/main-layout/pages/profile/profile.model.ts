// Shared
import type { StudyPlanStats } from '@shared/models/study-plan.model';
import type { ExamHistoryEntry } from '@shared/models/exam-history.model';

export type { StudyPlanStats, ExamHistoryEntry };

/** 單字學習統計摘要 */
export interface VocabStats {
  totalSessions: number;
  knownWords: number;
}
