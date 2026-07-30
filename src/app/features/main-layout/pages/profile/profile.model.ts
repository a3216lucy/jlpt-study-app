// Shared
import type { StudyPlanStats } from '@core/models/study-plan.model';
import type { ExamHistoryEntry } from '@core/models/exam-history.model';

export type { StudyPlanStats, ExamHistoryEntry };

/** 單字學習統計摘要 */
export interface VocabStats {
  /** 累計學習/測驗次數 */
  totalSessions: number;
  /** 已認識/已掌握的單字數 */
  knownWords: number;
}
