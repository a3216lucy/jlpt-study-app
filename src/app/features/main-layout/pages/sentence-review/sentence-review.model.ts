export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type SentenceReviewTab = 'common' | 'exam';

/** 句型例句 */
export interface SentenceExample {
  jp: string;
  zh: string;
}

/** 單一句型（文型） */
export interface SentencePattern {
  id: string;
  pattern: string;
  formation: string;
  meaning: string;
  notes: string;
  examples: SentenceExample[];
}

/** 句型分類 */
export interface SentencePatternGroup {
  id: string;
  title: string;
  description: string;
  color: string;
  patterns: SentencePattern[];
}

/** JSON 完整結構（沿用既有 grammar-n3-review.json） */
export interface SentenceReviewData {
  title: string;
  groups: SentencePatternGroup[];
}

export const LEVEL_DATA_MAP: Partial<Record<JlptLevel, string>> = {
  N3: 'assets/data/grammar-n3-review.json',
};
