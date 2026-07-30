import type { Timestamp } from '@angular/fire/firestore';

/** 考古題作答歷史單筆紀錄 */
export interface ExamHistoryEntry {
  /** Firestore document id */
  id: string;
  /** 對應 PAST_EXAM_CATALOG 的 examId */
  examId: string;
  /** 對應 section id */
  sectionId: string;
  /** 答對題數 */
  score: number;
  /** 該科目總題數 */
  total: number;
  /** 答錯的題目 id 清單，供錯題複習使用 */
  wrongQuestionIds: string[];
  /** 完成作答的時間 */
  completedAt: Timestamp;
  /** 顯示用：考卷標題 */
  examLabel: string;
  /** 顯示用：科目標題 */
  sectionLabel: string;
}
