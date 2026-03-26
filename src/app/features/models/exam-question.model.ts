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
