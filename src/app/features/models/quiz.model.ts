import { JlptLevel } from './vocab.model';

export type QuizType = 'multiple-choice' | 'true-false' | 'sort';
export type QuizMode = 'vocab-meaning' | 'vocab-reading' | 'sentence-fill';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  mode: QuizMode;
  level: JlptLevel;
  prompt: string;
  questionText?: string;
  questionTranslation?: string;
  furigana?: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  sourceWordId: string;
  audio?: string;
}

export interface QuizResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

export interface QuizSession {
  id: string;
  level: JlptLevel;
  questions: QuizQuestion[];
  results: QuizResult[];
  startedAt: Date;
  completedAt?: Date;
}
