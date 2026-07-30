/** Kanji Alive API 搜尋結果中的漢字基本資訊 */
export interface KanjiAliveSearchKanji {
  /** 漢字本身 */
  character: string;
  /** 筆畫數 */
  stroke: number;
}

/** Kanji Alive API 的部首資訊 */
export interface KanjiAliveRadical {
  /** 部首字元 */
  character: string;
  /** 部首筆畫數 */
  stroke: number;
  /** 部首在該漢字中的順序 */
  order: number;
}

/** Kanji Alive 搜尋 API 單筆結果 */
export interface KanjiAliveSearchResult {
  /** 漢字基本資訊 */
  kanji: KanjiAliveSearchKanji;
  /** 部首資訊（部分結果可能沒有） */
  radical?: KanjiAliveRadical;
}

/** Kanji Alive API 的例詞 */
export interface KanjiAliveExample {
  /** 日文例詞 */
  japanese?: string;
  /** 英文意思 */
  meaning?: string;
  /** 發音檔連結 */
  audio?: string;
}

/** Kanji Alive 漢字詳細資料 API 回應 */
export interface KanjiAliveKanjiDetail {
  /** 漢字本體資訊 */
  kanji?: {
    /** 漢字字元 */
    character?: string;
    /** 意思 */
    meaning?: {
      /** 英文意思 */
      english?: string;
    };
    /** 音讀 */
    onyomi?: {
      /** 羅馬拼音 */
      romaji?: string;
      /** 片假名標註 */
      katakana?: string;
    };
    /** 訓讀 */
    kunyomi?: {
      /** 羅馬拼音 */
      romaji?: string;
      /** 平假名標註 */
      hiragana?: string;
    };
    /** 筆畫資訊 */
    strokes?: {
      /** 筆畫數 */
      count?: number;
      /** 每一筆畫的時間點（供筆順動畫使用） */
      timings?: number[];
      /** 筆順示意圖連結清單 */
      images?: string[];
    };
  };
  /** 部首資訊 */
  radical?: {
    /** 部首字元 */
    character?: string;
    /** 部首意思 */
    meaning?: string;
    /** 部首位置說明（如「上」「下」「左」） */
    position?: string;
  };
  /** 例詞清單 */
  examples?: KanjiAliveExample[];
  /** 其他參考資料（如教材對照頁碼） */
  references?: Record<string, string | number>;
}
