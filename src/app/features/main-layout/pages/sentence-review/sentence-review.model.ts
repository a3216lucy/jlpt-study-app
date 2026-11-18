/** 句型頁支援的 JLPT 級別（目前僅 N3 有資料） */
export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

/** 句型例句 */
export interface SentenceExample {
  /** 日文例句 */
  jp: string;
  /** 中文翻譯 */
  zh: string;
}

/** 單一句型（文型） */
export interface SentencePattern {
  /** 句型 id */
  id: string;
  /** 句型（文型）文字 */
  pattern: string;
  /** 接続（文法組成方式）說明 */
  formation: string;
  /** 意思說明 */
  meaning: string;
  /** 補充備註（辨析、常見錯誤、課程補充等） */
  notes: string;
  /** 例句清單 */
  examples: SentenceExample[];
  /** 後接：後面接什麼、前後項的限制（`後面：…\n限制：…`，可無） */
  after?: string;
  /** 後接已逐條對照考古題核對（未核對的不顯示） */
  afterChecked?: boolean;
  /** 是否為考古題考過的句型（畫面標出、可「只看常考」） */
  hot?: boolean;
}

/** 句型分類 */
export interface SentencePatternGroup {
  /** 分類 id（以 `exam-` 開頭者歸類為「考題重點」頁籤） */
  id: string;
  /** 分類標題 */
  title: string;
  /** 分類說明文字 */
  description: string;
  /** 易混比較（一點一行，顯示在分類最上方；可空） */
  compare?: string[];
  /** 分類側欄標示色 */
  color: string;
  /** 該分類底下的句型清單 */
  patterns: SentencePattern[];
}

/** JSON 完整結構（沿用既有 grammar-n3-review.json） */
export interface SentenceReviewData {
  /** 資料標題 */
  title: string;
  /** 分類清單 */
  groups: SentencePatternGroup[];
}

/** JLPT 級別 → 對應資料檔路徑（僅列出已有資料的級別） */
export const LEVEL_DATA_MAP: Partial<Record<JlptLevel, string>> = {
  N3: 'assets/data/grammar-n3-review.json',
  N2: 'assets/data/grammar-n2-review.json',
};

/** 句型下的練習題（取自考古題） */
export interface PatternPracticeQuestion {
  /** 題幹（含 `<u>`／空格） */
  q: string;
  /** 四個選項文字 */
  options: string[];
  /** 正解索引（0–3） */
  answer: number;
  /** 解析重點（💡 那一行） */
  why: string;
}

/** 句型 id → 練習題 */
export type PatternPracticeMap = Record<string, PatternPracticeQuestion[]>;

/** JLPT 級別 → 練習題檔案路徑 */
export const PRACTICE_DATA_MAP: Partial<Record<JlptLevel, string>> = {
  N3: 'assets/data/pattern-practice-n3.json',
  N2: 'assets/data/pattern-practice-n2.json',
};
