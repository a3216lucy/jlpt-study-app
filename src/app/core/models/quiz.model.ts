import { JlptLevel } from './vocab.model';

/** 題目呈現形式 */
export type QuizType = 'multiple-choice' | 'true-false' | 'sort';
/** 出題模式：單字意思／單字讀音／句子填空 */
export type QuizMode = 'vocab-meaning' | 'vocab-reading' | 'sentence-fill';

/** 單一選項 */
export interface QuizOption {
  /** 選項 id */
  id: string;
  /** 選項文字 */
  text: string;
  /** 是否為正解 */
  isCorrect: boolean;
}

/** 單一測驗題目 */
export interface QuizQuestion {
  /** 題目 id */
  id: string;
  /** 題目呈現形式 */
  type: QuizType;
  /** 出題模式 */
  mode: QuizMode;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 題幹 */
  prompt: string;
  /** 額外題目文字 */
  questionText?: string;
  /** 題目中文翻譯 */
  questionTranslation?: string;
  /** 假名標註 */
  furigana?: string;
  /** 選項清單 */
  options: QuizOption[];
  /** 正解的選項 id */
  correctAnswer: string;
  /** 詳解說明 */
  explanation: string;
  /** 出題來源的單字 id */
  sourceWordId: string;
  /** 發音檔路徑 */
  audio?: string;
}

/** 單題作答結果 */
export interface QuizResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
  /** 作答花費時間（毫秒） */
  timeSpentMs: number;
}

/** 一整輪測驗 session */
export interface QuizSession {
  /** session id */
  id: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 本輪題目清單 */
  questions: QuizQuestion[];
  /** 已作答的結果清單 */
  results: QuizResult[];
  /** 開始時間 */
  startedAt: Date;
  /** 完成時間（尚未完成時為 undefined） */
  completedAt?: Date;
}
