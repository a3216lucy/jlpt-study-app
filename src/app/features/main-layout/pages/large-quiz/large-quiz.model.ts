// Shared
import type { ExamQuestionType } from '@core/models/exam-question.model';

/** 單題作答結果 */
export interface ExamResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
  /** 作答花費時間（毫秒） */
  timeSpentMs: number;
}

/** 選題畫面的題組選項 */
export interface ExamGroupChoice {
  /** 題組 id */
  id: string;
  /** 所屬科目，目前句型測驗固定為 grammar */
  category: 'grammar';
  /** 題型 */
  type: ExamQuestionType;
  /** 題組顯示名稱 */
  label: string;
  /** 題組說明文字 */
  description: string;
}
