/** Jisho.org API 回傳的日文寫法/讀音對 */
export interface JishoJapaneseWord {
  /** 漢字/原文寫法（純假名詞彙可能沒有） */
  word?: string;
  /** 假名讀音 */
  reading: string;
}

/** Jisho.org API 回傳的單一字義 */
export interface JishoSense {
  /** 英文釋義清單 */
  english_definitions: string[];
  /** 詞性標籤（英文） */
  parts_of_speech: string[];
  /** 額外標籤，如「Usually written using kana alone」 */
  tags: string[];
  /** 相關連結 */
  links: Array<{ text: string; url: string }>;
}

/** Jisho.org API 回傳的資料來源標記 */
export interface JishoAttribution {
  /** 是否來自 JMdict 辭典 */
  jmdict: boolean;
  /** 是否來自 JMnedict（專有名詞）辭典 */
  jmnedict: boolean;
  /** DBpedia 連結（沒有則為 false） */
  dbpedia?: string | false;
}

/** Jisho.org API 回傳的單一查詢結果 */
export interface JishoEntry {
  /** 條目識別字串 */
  slug: string;
  /** 是否為常用詞 */
  is_common: boolean;
  /** 標籤 */
  tags: string[];
  /** 對應的 JLPT 級別清單 */
  jlpt: string[];
  /** 日文寫法/讀音對清單 */
  japanese: JishoJapaneseWord[];
  /** 字義清單 */
  senses: JishoSense[];
  /** 資料來源標記 */
  attribution: JishoAttribution;
}

/** Jisho.org 搜尋 API 完整回應 */
export interface JishoSearchResponse {
  /** 查詢結果清單 */
  data: JishoEntry[];
}
