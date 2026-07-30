import { JlptLevel } from './vocab.model';

/** 文法測驗出題模式：意思選擇／句子填空／混合 */
export type GrammarQuizMode = 'meaning-choice' | 'sentence-fill' | 'mixed';
/** 語域：口語／中性／正式／書面語 */
export type GrammarRegister = 'spoken' | 'neutral' | 'formal' | 'written';

/** 文法句型的其中一種意思（新版正規化資料用） */
export interface GrammarMeaning {
  /** 意思 id */
  id: string;
  /** 意思說明文字 */
  label: string;
}

/** 接続（文法組成方式）的其中一段 */
export interface GrammarFormation {
  /** 前接部分 */
  left: string;
  /** 後接部分 */
  right: string;
  /** 額外限制條件說明 */
  constraint?: string;
}

/** 句型的其中一種用法 */
export interface GrammarUsage {
  /** 用法 id */
  id: string;
  /** 對應的 GrammarMeaning id */
  meaningId?: string;
  /** 用法標籤文字 */
  label?: string;
  /** 補充說明 */
  notes?: string[];
}

/** 句型出處參考資料 */
export interface GrammarSourceRef {
  /** 出處書名/教材名 */
  title: string;
  /** 頁碼 */
  page: number;
}

/** 例句 */
export interface GrammarExample {
  /** 例句 id */
  id?: string;
  /** 日文例句 */
  jp: string;
  /** 中文翻譯 */
  zh: string;
  /** 對應的 GrammarUsage id */
  usageId?: string;
  /** 句子填空題型：被挖空的文字 */
  blank?: string;
  /** 句子填空題型：正解文字 */
  answer?: string;
  /** 句子填空題型：干擾選項 */
  distractors?: string[];
  /** 解析說明 */
  explanation?: string;
  /** 指定句中要被挖空的文字（若未填則 service 自動偵測）*/
  highlight?: string;
}

/** 單一文法句型 */
export interface GrammarPattern {
  /** 句型 id */
  id: string;
  /** 句型（文型）文字 */
  pattern: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 舊版扁平資料仍使用單一 meaning */
  meaning?: string;
  /** 新版正規化資料建議使用 meanings */
  meanings?: GrammarMeaning[];
  /** 代表性單字/例字 */
  headword?: string;
  /** 分類標籤 */
  category?: string[];
  /** 語域 */
  register?: GrammarRegister;
  /** 舊版扁平資料仍使用 structure */
  structure?: string;
  /** 接続方式 */
  formation?: GrammarFormation[];
  /** 舊版為單一字串，新版改為多筆備註 */
  notes?: string | string[];
  /** 用法清單 */
  usages?: GrammarUsage[];
  /** 例句清單 */
  examples: GrammarExample[];
  /** 出處參考 */
  source?: GrammarSourceRef[];
  /** 額外標籤 */
  tags?: string[];
}

/** 文法測驗單一選項 */
export interface GrammarQuizOption {
  /** 選項 id */
  id: string;
  /** 選項文字 */
  text: string;
  /** 是否為正解 */
  isCorrect: boolean;
}

/** 文法測驗單一題目 */
export interface GrammarQuizQuestion {
  /** 題目 id */
  id: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 出題模式 */
  mode: GrammarQuizMode;
  /** 題幹 */
  prompt: string;
  /** 對應句型的接続結構文字 */
  structure: string;
  /** 提示文字 */
  hint: string;
  /** 選項清單 */
  options: GrammarQuizOption[];
  /** 正解的選項 id */
  correctAnswer: string;
  /** 詳解說明 */
  explanation: string;
  /** 相關例句 */
  examples: GrammarExample[];
  /** 出題來源的句型 id */
  sourcePatternId: string;
  /** 句子填空專用：含 ＿＿＿ 的句子 */
  sentenceWithBlank?: string;
  /** 句子填空專用：句子中文翻譯 */
  sentenceTranslation?: string;
}

/** 文法測驗單題作答結果 */
export interface GrammarQuizResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
  /** 作答花費時間（毫秒） */
  timeSpentMs: number;
}
