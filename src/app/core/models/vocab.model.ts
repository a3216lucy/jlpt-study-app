/** JLPT 級別，`GEN` 表示不分級的通用內容 */
export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'GEN';
/** 詞性分類 */
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression' | 'other';

/** 例句 */
export interface Sentence {
  /** 日文例句 */
  jp: string;
  /** 中文翻譯 */
  zh: string;
}

/** 單字資料 */
export interface VocabWord {
  /** 單字 id */
  id: string;
  /** 漢字/原文寫法 */
  kanji: string;
  /** 假名讀音 */
  furigana: string;
  /** 中文意思 */
  meaning: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 詞性 */
  type: WordType;
  /** 例句清單 */
  sentences: Sentence[];
  /** 發音檔路徑 */
  audio?: string;
}
