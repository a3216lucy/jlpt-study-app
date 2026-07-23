export type ReviewTab = 'conjugation' | 'keigo' | 'transitivity' | 'rules' | 'compound-verb';

// ── 動詞活用／活用規則 types ──────────────────────────────────────────────────

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

/** 敬語頁「特殊動詞対応表」用的簡化版（單一字串 + 中文意思） */
export interface SpecialVerbRow {
  plain: string;
  sonkei: string;
  kenjou: string;
  meaning: string;
}

/** 動詞活用頁「主要活用表」單一列（I/II/III群各一個例字） */
export interface QuickReferenceRow {
  formLabel: string;
  groupI: string;
  groupII: string;
  groupIII: string;
}

/** 活用規則頁完整表：單一列（含例外情況欄） */
export interface AllFormsRow {
  formLabel: string;
  groupI: string;
  groupII: string;
  groupIII: string;
  exception: string;
}

/** 活用規則頁完整表：分類區塊（如「基本・丁寧」「て・た系」…） */
export interface AllFormsCategory {
  category: string;
  rows: AllFormsRow[];
}

/** て・た形音便對照表 */
export interface OnbinTableRow {
  ending: string;
  onbinType: string;
  change: string;
  example: string;
}

export interface VerbConjugationData {
  masuForm: VerbClassTable;
  jishoForm: VerbClassTable;
  forms: VerbFormTable[];
  politeVsPlain: { sections: VerbPoliteSection[] };
  sonkeigo: SonkeigoRow[];
  specialVerbTable: SpecialVerbRow[];
  quickReference: QuickReferenceRow[];
  allForms: AllFormsCategory[];
  onbinTable: OnbinTableRow[];
}

// ── 自他動詞 types ────────────────────────────────────────────────────────────

export interface TransitivityDefinitionCard {
  label: string;
  description: string;
  example: string;
}

export interface TransitivityPair {
  jidoushi: string;
  tadoushi: string;
  meaning: string;
  rule: string;
}

export interface TransitivitySuffixCard {
  pattern: string;
  jidoushiTag: string | null;
  tadoushiTag: string | null;
  description: string;
  example: string;
}

export interface TransitivityData {
  definitionCards: TransitivityDefinitionCard[];
  pairs: TransitivityPair[];
  suffixCards: TransitivitySuffixCard[];
  tip: string;
}

// ── 敬語頁靜態內容 types ──────────────────────────────────────────────────────

export interface KeigoCategoryCard {
  label: string;
  description: string;
  example: string;
}

export interface KeigoFormationRule {
  rule: string;
  example: string;
}

export interface KeigoFormationGroup {
  label: string;
  rules: KeigoFormationRule[];
}

// ── 複合動詞規則 types ────────────────────────────────────────────────────────

export interface CompoundVerbExample {
  jp: string;
  zh: string;
}

export interface CompoundVerbPattern {
  id: string;
  pattern: string;
  reading?: string;
  formation: string;
  meaning: string;
  notes: string;
  examples: CompoundVerbExample[];
}

export interface CompoundVerbRuleGroup {
  id: string;
  title: string;
  description: string;
  color: string;
  patterns: CompoundVerbPattern[];
}

export interface CompoundVerbRuleData {
  title: string;
  groups: CompoundVerbRuleGroup[];
}
