import { JlptLevel } from './vocab.model';

export type ExamCategory = 'vocabulary' | 'grammar' | 'reading';
export type ExamQuestionType = 'multiple-choice' | 'sentence-fill';

export interface ExamOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: string;
  level: JlptLevel;
  category: ExamCategory;
  type: ExamQuestionType;
  prompt: string;
  questionText?: string;
  questionTranslation?: string;
  options: ExamOption[];
  correctAnswer: string;
  explanation: string;
  tags?: string[];
  /** 科目下的子分類題號，如語彙問題1〜5、文法問題1〜3（見 tools/tag-exam-subtypes.mjs） */
  problemNumber?: number;
  /** 子分類顯示名稱，如「漢字読み」「文法形式」「読解（短文）」 */
  problemLabel?: string;
}

export interface ExamSet {
  id: string;
  title: string;
  description: string;
  level: JlptLevel;
  category: ExamCategory;
  type: ExamQuestionType;
  questions: ExamQuestion[];
}
