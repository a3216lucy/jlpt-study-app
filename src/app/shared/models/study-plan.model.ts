import type { Timestamp } from '@angular/fire/firestore';

/** 學習計畫狀態 */
export type StudyPlanStatus = 'active' | 'paused' | 'completed';

/** SRS 單字學習階段 */
export type SRSStage = 'new' | 'learning' | 'learned';

/** 學習計畫 */
export interface StudyPlan {
  /** Firestore document id */
  id: string;
  /** JLPT 等級，例如 'N3' */
  level: string;
  /** 對應 JSON 資料路徑 */
  dataPath: string;
  /** 每日新單字數量 */
  dailyNewWords: number;
  /** 計畫總單字數（由詞庫決定） */
  totalWords: number;
  /** 開始日期 YYYY-MM-DD */
  startDate: string;
  /** 預計完成日期 YYYY-MM-DD */
  endDate: string;
  /** 計畫狀態 */
  status: StudyPlanStatus;
  /** 建立時間 */
  createdAt: Timestamp;
}

/** 單一單字的 SRS 學習紀錄 */
export interface VocabSRSRecord {
  /** 單字 id，對應 VocabEntry.id */
  wordId: string;
  /** 所屬計畫 id */
  planId: string;
  /** JLPT 等級 */
  level: string;
  /** 目前複習間隔（天） */
  interval: number;
  /** 下次複習日 YYYY-MM-DD */
  dueDate: string;
  /** 難易係數，初始 2.5 */
  easeFactor: number;
  /** 累計作答次數 */
  reps: number;
  /** 答對次數 */
  knownCount: number;
  /** 答錯次數 */
  wrongCount: number;
  /** 上次複習日 YYYY-MM-DD */
  lastReviewed: string;
  /** 學習階段 */
  stage: SRSStage;
}

/** 單字計畫的統計摘要（由 vocabRecords 聚合） */
export interface StudyPlanStats {
  /** 對應的計畫 */
  plan: StudyPlan;
  /** 尚未開始學習的單字數 */
  newCount: number;
  /** 複習中（interval < 21 天） */
  learningCount: number;
  /** 已掌握（interval >= 21 天） */
  learnedCount: number;
  /** 今日到期待複習數 */
  dueToday: number;
  /** 今日可新增的單字數 */
  newToday: number;
}
