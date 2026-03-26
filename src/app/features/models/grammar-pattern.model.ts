import { JlptLevel } from './vocab.model';

export type GrammarQuizMode = 'meaning-choice' | 'sentence-fill' | 'mixed';

export interface GrammarExample {
  jp: string;
  zh: string;
  /** 指定句中要被挖空的文字（若未填則 service 自動偵測）*/
  highlight?: string;
}

export interface GrammarPattern {
  id: string;
  pattern: string;
  meaning: string;
  level: JlptLevel;
  structure: string;
  notes?: string;
  examples: GrammarExample[];
}

export interface GrammarQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface GrammarQuizQuestion {
  id: string;
  level: JlptLevel;
  mode: GrammarQuizMode;
  prompt: string;
  structure: string;
  hint: string;
  options: GrammarQuizOption[];
  correctAnswer: string;
  explanation: string;
  examples: GrammarExample[];
  sourcePatternId: string;
  /** 句子填空專用：含 ＿＿＿ 的句子 */
  sentenceWithBlank?: string;
  /** 句子填空專用：句子中文翻譯 */
  sentenceTranslation?: string;
}

export interface GrammarQuizResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentMs: number;
}
