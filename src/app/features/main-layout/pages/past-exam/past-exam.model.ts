// Shared
import type { PastExamSection } from '@core/config/past-exam-catalog';

/** 單題作答結果 */
export interface PastExamResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
}

/** 一份考試裡，單一科目的作答統計（結果頁「各科目表現」用） */
export interface ExamSectionScore {
  /** 對應的科目 section */
  section: PastExamSection;
  /** 該科目答對題數 */
  score: number;
  /** 該科目總題數 */
  total: number;
}
