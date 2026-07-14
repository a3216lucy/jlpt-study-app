import type { Timestamp } from '@angular/fire/firestore';

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
