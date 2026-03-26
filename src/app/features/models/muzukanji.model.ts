export interface MuzukanjiPaginationLink {
  href?: string;
  rel?: string;
}

export interface MuzukanjiPagination {
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  links?: MuzukanjiPaginationLink[];
}

export interface MuzukanjiListResponse<T> {
  data: T[];
  pagination?: MuzukanjiPagination;
}

export interface MuzukanjiKanjiSummary {
  id: number;
  kanji: string;
  meanings: string;
  detail?: string;
}

export interface MuzukanjiKanjiDetail {
  id: number;
  kanji: string;
  meanings: string;
  kunyomi: string;
  kunyomiRomaji: string;
  onyomi: string;
  onyomiRomaji: string;
  strokes: number;
  jlptLevel?: string;
  jyoyoGradeTaught?: number;
  mostUsedInNewspapers?: number;
}
