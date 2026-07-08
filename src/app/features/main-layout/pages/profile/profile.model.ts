// Angular Fire
import type { Timestamp } from '@angular/fire/firestore';
// Shared
import type { StudyPlanStats } from '@shared/models/study-plan.model';

export type { StudyPlanStats };

/** 考古題作答歷史單筆紀錄 */
export interface ExamHistoryEntry {
  /** Firestore document id */
  id: string;
  /** 對應 PAST_EXAM_CATALOG 的 examId */
  examId: string;
  /** 對應 section id */
  sectionId: string;
  score: number;
  total: number;
  wrongQuestionIds: string[];
  completedAt: Timestamp;
  /** 顯示用：考卷標題 */
  examLabel: string;
  /** 顯示用：科目標題 */
  sectionLabel: string;
}

/** 單字學習統計摘要 */
export interface VocabStats {
  totalSessions: number;
  knownWords: number;
}
