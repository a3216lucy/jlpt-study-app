// Shared
import type { PastExamSection } from '@shared/config/past-exam-catalog';

/** 單題作答結果 */
export interface PastExamResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

/** 一份考試裡，單一科目的作答統計（結果頁「各科目表現」用） */
export interface ExamSectionScore {
  section: PastExamSection;
  score: number;
  total: number;
}
