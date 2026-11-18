// Angular Fire
import type { Timestamp } from '@angular/fire/firestore';

/** 作答模式：練習（即時驗證）／實際演練（計時、交卷才公布） */
export type ExamAttemptMode = 'practice' | 'mock';

/** 作答狀態 */
export type ExamAttemptStatus = 'in-progress' | 'completed';

/** 練習範圍 */
export type ExamScope =
  | { type: 'all' }
  | { type: 'section'; sectionId: string }
  | { type: 'problem'; sectionId: string; problemNumber: number }
  | { type: 'unmastered' };

/** 實際演練專屬資訊 */
export interface ExamAttemptMockInfo {
  /** 目前所在的計時階段（N3 兩段、N2 一段） */
  stageIndex: number;
  /** 已用秒數（含所有階段） */
  elapsedSec: number;
  /** 是否因時間到而自動交卷 */
  timedOut: boolean;
}

/** 一次作答紀錄（Firestore：users/{uid}/examAttempts/{id}） */
export interface ExamAttempt {
  /** Firestore document id */
  id: string;
  /** 對應 PAST_EXAM_CATALOG 的 examId */
  examId: string;
  /** 作答模式 */
  mode: ExamAttemptMode;
  /** 練習範圍的字串標記，見 `scopeKey()` */
  scopeKey: string;
  /** 同 examId＋mode 內的第幾次（從 1 開始） */
  attemptNo: number;
  /** 進行中／已完成 */
  status: ExamAttemptStatus;
  /** 本次包含的題目 id（依作答順序） */
  questionIds: string[];
  /** 已作答：題目 id → 選項 id */
  answers: Record<string, string>;
  /** 標記的題目 id */
  markedIds: string[];
  /** 目前題目索引（續做時回到這題） */
  currentIndex: number;
  /** 開始時間 */
  startedAt: Timestamp | null;
  /** 最後更新時間 */
  updatedAt: Timestamp | null;
  /** 完成時間 */
  completedAt: Timestamp | null;
  /** 答對題數（完成後才有） */
  score: number;
  /** 總題數 */
  total: number;
  /** 答錯或未作答的題目 id（完成後才有） */
  wrongQuestionIds: string[];
  /** 實際演練專屬資訊 */
  mock: ExamAttemptMockInfo | null;
}
