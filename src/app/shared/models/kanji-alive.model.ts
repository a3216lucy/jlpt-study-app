export interface KanjiAliveSearchKanji {
  character: string;
  stroke: number;
}

export interface KanjiAliveRadical {
  character: string;
  stroke: number;
  order: number;
}

export interface KanjiAliveSearchResult {
  kanji: KanjiAliveSearchKanji;
  radical?: KanjiAliveRadical;
}

export interface KanjiAliveExample {
  japanese?: string;
  meaning?: string;
  audio?: string;
}

export interface KanjiAliveKanjiDetail {
  kanji?: {
    character?: string;
    meaning?: {
      english?: string;
    };
    onyomi?: {
      romaji?: string;
      katakana?: string;
    };
    kunyomi?: {
      romaji?: string;
      hiragana?: string;
    };
    strokes?: {
      count?: number;
      timings?: number[];
      images?: string[];
    };
  };
  radical?: {
    character?: string;
    meaning?: string;
    position?: string;
  };
  examples?: KanjiAliveExample[];
  references?: Record<string, string | number>;
}
