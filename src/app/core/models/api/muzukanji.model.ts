/** Muzukanji API 分頁連結 */
export interface MuzukanjiPaginationLink {
  /** 連結網址 */
  href?: string;
  /** 連結關係，如 next/prev/self */
  rel?: string;
}

/** Muzukanji API 分頁資訊 */
export interface MuzukanjiPagination {
  /** 目前頁碼 */
  page?: number;
  /** 每頁筆數 */
  size?: number;
  /** 總筆數 */
  totalElements?: number;
  /** 總頁數 */
  totalPages?: number;
  /** 分頁連結清單 */
  links?: MuzukanjiPaginationLink[];
}

/** Muzukanji 列表型 API 回應（泛型 T 為單筆資料型別） */
export interface MuzukanjiListResponse<T> {
  /** 資料清單 */
  data: T[];
  /** 分頁資訊 */
  pagination?: MuzukanjiPagination;
}

/** Muzukanji 漢字列表項目（簡略資訊） */
export interface MuzukanjiKanjiSummary {
  /** Muzukanji 內部 id */
  id: number;
  /** 漢字字元 */
  kanji: string;
  /** 意思（逗號分隔的英文字串） */
  meanings: string;
  /** 詳細資料連結 */
  detail?: string;
}

/** Muzukanji 漢字詳細資料 */
export interface MuzukanjiKanjiDetail {
  /** Muzukanji 內部 id */
  id: number;
  /** 漢字字元 */
  kanji: string;
  /** 意思（逗號分隔的英文字串） */
  meanings: string;
  /** 訓讀（假名） */
  kunyomi: string;
  /** 訓讀羅馬拼音 */
  kunyomiRomaji: string;
  /** 音讀（假名） */
  onyomi: string;
  /** 音讀羅馬拼音 */
  onyomiRomaji: string;
  /** 筆畫數 */
  strokes: number;
  /** 對應 JLPT 級別 */
  jlptLevel?: string;
  /** 常用漢字表教授年級 */
  jyoyoGradeTaught?: number;
  /** 報紙常用度排名 */
  mostUsedInNewspapers?: number;
}
