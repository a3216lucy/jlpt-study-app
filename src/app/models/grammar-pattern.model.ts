import { JlptLevel } from './vocab.model';

export type GrammarQuizMode = 'meaning-choice' | 'sentence-fill' | 'mixed';
export type GrammarRegister = 'spoken' | 'neutral' | 'formal' | 'written';

export interface GrammarMeaning {
  id: string;
  label: string;
}

export interface GrammarFormation {
  left: string;
  right: string;
  constraint?: string;
}

export interface GrammarUsage {
  id: string;
  meaningId?: string;
  label?: string;
  notes?: string[];
}

export interface GrammarSourceRef {
  title: string;
  page: number;
}

export interface GrammarExample {
  id?: string;
  jp: string;
  zh: string;
  usageId?: string;
  blank?: string;
  answer?: string;
  distractors?: string[];
  explanation?: string;
  /** 指定句中要被挖空的文字（若未填則 service 自動偵測）*/
  highlight?: string;
}

export interface GrammarPattern {
  id: string;
  pattern: string;
  level: JlptLevel;
  /** 舊版扁平資料仍使用單一 meaning */
  meaning?: string;
  /** 新版正規化資料建議使用 meanings */
  meanings?: GrammarMeaning[];
  headword?: string;
  category?: string[];
  register?: GrammarRegister;
  /** 舊版扁平資料仍使用 structure */
  structure?: string;
  formation?: GrammarFormation[];
  /** 舊版為單一字串，新版改為多筆備註 */
  notes?: string | string[];
  usages?: GrammarUsage[];
  examples: GrammarExample[];
  source?: GrammarSourceRef[];
  tags?: string[];
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
