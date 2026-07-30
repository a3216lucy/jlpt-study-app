/** 文法頁頁籤：動詞活用／敬語／自他動詞／活用規則／複合動詞 */
export type ReviewTab = 'conjugation' | 'keigo' | 'transitivity' | 'rules' | 'compound-verb';

// ── 動詞活用／活用規則 types ──────────────────────────────────────────────────

/** て・た形音便子列（某個音便規則底下的例字） */
export interface VerbOnbinRow {
  /** 音便類型名稱，如「い音便」 */
  type: string;
  /** 類型標示色 */
  typeColor: string;
  /** 規則說明文字 */
  rule: string;
  /** 例字清單 */
  examples: string[];
}

/** 動詞活用表單一列（依動詞群別分類） */
export interface VerbTableRow {
  /** 群別名稱，如「I 群（五段動詞）」 */
  group: string;
  /** 群別標示色 */
  color: string;
  /** 該群別的變化規則說明 */
  rule?: string;
  /** 例字清單 */
  examples?: string[];
  /** 是否為例外情況列 */
  isException?: boolean;
  /** 例外情況的例字清單 */
  exceptions?: string[];
  /** 是否為 III 群（不規則動詞） */
  isIII?: boolean;
  /** 條列項目（用於不適合表格呈現的內容） */
  items?: string[];
  /** 音便子列（て・た形音便對照用） */
  subRows?: VerbOnbinRow[];
}

/** ます形／辞書形分類表（含 I/II/III 群） */
export interface VerbClassTable {
  /** 表格標題 */
  title: string;
  /** 表格副標題 */
  subtitle: string;
  /** 各群別的列資料 */
  rows: VerbTableRow[];
}

/** 單一活用形的完整表格（如て形、た形…） */
export interface VerbFormTable {
  /** 活用形 id */
  id: string;
  /** 活用形簡短標籤 */
  label: string;
  /** 表格標題 */
  title: string;
  /** 各群別的列資料 */
  rows: VerbTableRow[];
}

/** 敬體／常體對照表單一列 */
export interface VerbPoliteRow {
  /** 時態說明，如「現在肯定」 */
  tense: string;
  /** 敬體（ます形）寫法 */
  polite: string;
  /** 常體（普通形）寫法 */
  plain: string;
  /** 補充說明 */
  note?: string;
}

/** 敬體／常體對照表分類區塊 */
export interface VerbPoliteSection {
  /** 區塊名稱，如「動詞」「い形容詞」 */
  name: string;
  /** 區塊標示色 */
  color: string;
  /** 該區塊的對照列 */
  rows: VerbPoliteRow[];
}

/** 敬語完整版對應表單一列（尊敬語/謙讓語可能有多種說法） */
export interface SonkeigoRow {
  /** 普通形（辭書形）動詞 */
  plain: string;
  /** 尊敬語說法清單，無對應特殊尊敬語時為 null */
  sonkei: string[] | null;
  /** 謙讓語說法清單，無對應特殊謙讓語時為 null */
  kenjou: string[] | null;
}

/** 敬語頁「特殊動詞対応表」用的簡化版（單一字串 + 中文意思） */
export interface SpecialVerbRow {
  /** 普通形（辭書形）動詞 */
  plain: string;
  /** 尊敬語說法 */
  sonkei: string;
  /** 謙讓語說法 */
  kenjou: string;
  /** 中文意思 */
  meaning: string;
  /** 普通形假名讀音 */
  plain_kana?: string;
  /** 尊敬語假名讀音 */
  sonkei_kana?: string;
  /** 謙讓語假名讀音 */
  kenjou_kana?: string;
}

/** 動詞活用頁「主要活用表」單一列（I/II/III群各一個例字） */
export interface QuickReferenceRow {
  /** 活用形名稱，如「ます形」「て形」 */
  formLabel: string;
  /** I 群（五段動詞）例字 */
  groupI: string;
  /** II 群（一段動詞）例字 */
  groupII: string;
  /** III 群（不規則動詞）例字 */
  groupIII: string;
  /** I 群例字假名讀音 */
  groupI_kana?: string;
  /** II 群例字假名讀音 */
  groupII_kana?: string;
  /** III 群例字假名讀音 */
  groupIII_kana?: string;
  /** I 群變化規則說明 */
  groupI_rule?: string;
  /** II 群變化規則說明 */
  groupII_rule?: string;
  /** III 群變化規則說明 */
  groupIII_rule?: string;
}

/** 活用規則頁完整表：單一列（含例外情況欄） */
export interface AllFormsRow {
  /** 活用形名稱 */
  formLabel: string;
  /** I 群變化方式 */
  groupI: string;
  /** II 群變化方式 */
  groupII: string;
  /** III 群變化方式 */
  groupIII: string;
  /** 例外情況說明 */
  exception: string;
}

/** 活用規則頁完整表：分類區塊（如「基本・丁寧」「て・た系」…） */
export interface AllFormsCategory {
  /** 分類名稱 */
  category: string;
  /** 該分類底下的活用形列 */
  rows: AllFormsRow[];
}

/** て・た形音便對照表 */
export interface OnbinTableRow {
  /** 動詞語尾字元 */
  ending: string;
  /** 音便類型名稱 */
  onbinType: string;
  /** 變化方式說明 */
  change: string;
  /** 例字 */
  example: string;
}

/** 動詞活用頁完整資料（verb-conjugation.json） */
export interface VerbConjugationData {
  /** ます形分類表 */
  masuForm: VerbClassTable;
  /** 辞書形分類表 */
  jishoForm: VerbClassTable;
  /** 各活用形完整表格清單 */
  forms: VerbFormTable[];
  /** 敬體／常體對照表 */
  politeVsPlain: { sections: VerbPoliteSection[] };
  /** 敬語完整版對應表 */
  sonkeigo: SonkeigoRow[];
  /** 敬語頁用的簡化版特殊動詞対応表 */
  specialVerbTable: SpecialVerbRow[];
  /** 主要活用表（動詞活用頁用） */
  quickReference: QuickReferenceRow[];
  /** 活用規則完整表（活用規則頁用） */
  allForms: AllFormsCategory[];
  /** て・た形音便對照表 */
  onbinTable: OnbinTableRow[];
}

// ── 自他動詞 types ────────────────────────────────────────────────────────────

/** 自他動詞頁「自他動詞是什麼」說明卡片 */
export interface TransitivityDefinitionCard {
  /** 卡片標籤 */
  label: string;
  /** 說明文字 */
  description: string;
  /** 範例 */
  example: string;
}

/** 自他動詞配對（自動詞／他動詞） */
export interface TransitivityPair {
  /** 自動詞 */
  jidoushi: string;
  /** 他動詞 */
  tadoushi: string;
  /** 中文意思 */
  meaning: string;
  /** 語尾規律說明 */
  rule: string;
}

/** 自他動詞語尾規律速記卡片 */
export interface TransitivitySuffixCard {
  /** 語尾規律樣式，如「〜aru／〜eru」 */
  pattern: string;
  /** 自動詞標籤，無對應時為 null */
  jidoushiTag: string | null;
  /** 他動詞標籤，無對應時為 null */
  tadoushiTag: string | null;
  /** 說明文字 */
  description: string;
  /** 範例 */
  example: string;
}

/** 自他動詞頁完整資料（verb-transitivity.json） */
export interface TransitivityData {
  /** 「自他動詞是什麼」說明卡片清單 */
  definitionCards: TransitivityDefinitionCard[];
  /** 自他動詞配對清單 */
  pairs: TransitivityPair[];
  /** 語尾規律速記卡片清單 */
  suffixCards: TransitivitySuffixCard[];
  /** 判斷技巧提示文字 */
  tip: string;
}

// ── 敬語頁靜態內容 types ──────────────────────────────────────────────────────

/** 敬語三分類（尊敬語/謙讓語/丁寧語）說明卡片 */
export interface KeigoCategoryCard {
  /** 分類名稱 */
  label: string;
  /** 說明文字 */
  description: string;
  /** 範例 */
  example: string;
}

/** 敬語構成規則單一列 */
export interface KeigoFormationRule {
  /** 規則說明，如「お＋ます形＋になる」 */
  rule: string;
  /** 範例 */
  example: string;
}

/** 敬語構成規則分類（尊敬語／謙讓語） */
export interface KeigoFormationGroup {
  /** 分類名稱 */
  label: string;
  /** 該分類底下的構成規則清單 */
  rules: KeigoFormationRule[];
}

// ── 複合動詞規則 types ────────────────────────────────────────────────────────

/** 複合動詞例句 */
export interface CompoundVerbExample {
  /** 日文例句 */
  jp: string;
  /** 中文翻譯 */
  zh: string;
}

/** 單一複合動詞規則 */
export interface CompoundVerbPattern {
  /** 規則 id */
  id: string;
  /** 複合動詞樣式，如「〜出す」 */
  pattern: string;
  /** 假名讀音 */
  reading?: string;
  /** 接続方式說明 */
  formation: string;
  /** 意思說明 */
  meaning: string;
  /** 補充備註 */
  notes: string;
  /** 例句清單 */
  examples: CompoundVerbExample[];
}

/** 複合動詞規則分類 */
export interface CompoundVerbRuleGroup {
  /** 分類 id */
  id: string;
  /** 分類標題 */
  title: string;
  /** 分類說明文字 */
  description: string;
  /** 分類標示色 */
  color: string;
  /** 該分類底下的規則清單 */
  patterns: CompoundVerbPattern[];
}

/** 複合動詞頁完整資料（自 grammar-n3-review.json 的 compound-verbs 群組轉換而來） */
export interface CompoundVerbRuleData {
  /** 資料標題 */
  title: string;
  /** 分類清單（目前僅有一組） */
  groups: CompoundVerbRuleGroup[];
}
