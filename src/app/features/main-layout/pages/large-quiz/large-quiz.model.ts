// Shared
import type { ExamQuestionType } from '@shared/models/exam-question.model';

/** 單題作答結果 */
export interface ExamResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

/** 選題畫面的題組選項 */
export interface ExamGroupChoice {
  id: string;
  category: 'grammar';
  type: ExamQuestionType;
  label: string;
  description: string;
}
