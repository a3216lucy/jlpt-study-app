/** 句型頁支援的 JLPT 級別（目前僅 N3 有資料） */
export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
/** 頁籤：常用句型／考題重點 */
export type SentenceReviewTab = 'common' | 'exam';

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
}

/** 句型分類 */
export interface SentencePatternGroup {
  /** 分類 id（以 `exam-` 開頭者歸類為「考題重點」頁籤） */
  id: string;
  /** 分類標題 */
  title: string;
  /** 分類說明文字 */
  description: string;
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
