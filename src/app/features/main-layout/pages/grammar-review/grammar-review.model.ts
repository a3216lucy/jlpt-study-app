export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type ReviewTab = 'general' | 'exam' | 'verb';

/** 文法例句 */
export interface GrammarExample {
  jp: string;
  zh: string;
}

/** 文法文型 */
export interface GrammarPattern {
  id: string;
  pattern: string;
  formation: string;
  meaning: string;
  notes: string;
  examples: GrammarExample[];
}

/** 文法分組 */
export interface GrammarGroup {
  id: string;
  title: string;
  description: string;
  color: string;
  patterns: GrammarPattern[];
}

/** JSON 完整結構 */
export interface ReviewData {
  title: string;
  groups: GrammarGroup[];
}

// ── 動詞変化 types ──────────────────────────────────────────────────────────

export interface VerbOnbinRow {
  type: string;
  typeColor: string;
  rule: string;
  examples: string[];
}

export interface VerbTableRow {
  group: string;
  color: string;
  rule?: string;
  examples?: string[];
  isException?: boolean;
  exceptions?: string[];
  isIII?: boolean;
  items?: string[];
  subRows?: VerbOnbinRow[];
}

export interface VerbClassTable {
  title: string;
  subtitle: string;
  rows: VerbTableRow[];
}

export interface VerbFormTable {
  id: string;
  label: string;
  title: string;
  rows: VerbTableRow[];
}

export interface VerbPoliteRow {
  tense: string;
  polite: string;
  plain: string;
  note?: string;
}

export interface VerbPoliteSection {
  name: string;
  color: string;
  rows: VerbPoliteRow[];
}

export interface SonkeigoRow {
  plain: string;
  sonkei: string[] | null;
  kenjou: string[] | null;
}

export interface VerbConjugationData {
  masuForm: VerbClassTable;
  jishoForm: VerbClassTable;
  forms: VerbFormTable[];
  politeVsPlain: { sections: VerbPoliteSection[] };
  sonkeigo: SonkeigoRow[];
}

export const LEVEL_DATA_MAP: Partial<Record<JlptLevel, string>> = {
  N3: 'assets/data/grammar-n3-review.json',
};
