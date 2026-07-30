/** 單詞頁畫面模式：總覽／卡牌背誦／測驗作答／測驗結果 */
export type PageMode = 'list' | 'flashcard' | 'quiz' | 'quiz-result';

// ── Vocab data types (source: vocab-review-n3.json) ─────────────────────────

/** 單字例句 */
export interface VocabExample {
  /** 日文例句 */
  jp: string;
  /** 中文翻譯 */
  zh: string;
}

/** 單一單字 */
export interface VocabEntry {
  /** 單字 id */
  id: string;
  /** 單字（漢字/原文寫法） */
  word: string;
  /** 假名讀音 */
  reading: string;
  /** 中文意思 */
  meaning: string;
  /** 詞性 */
  pos: string;
  /** JLPT 級別；未填視為 N3（vocab-review-n3.json 原有單字），N2 考古題單字填 'N2' */
  level?: VocabLevel;
  /** 考古題出處，如「2022年7月 N3 語彙」 */
  examSource?: string;
  /** 例句清單 */
  examples: VocabExample[];
  /** 易混淆點補充說明 */
  confusionNote?: string;
  /** 常考標記：出自實際考古題整理的單字為 true；之後新增的一般 N3 範圍單字可不填 */
  frequentlyTested?: boolean;
}

/** 單字分組（如動詞、名詞、個人複習整理…） */
export interface VocabGroup {
  /** 群組 id */
  id: string;
  /** 群組顯示名稱 */
  label: string;
  /** 群組標示色 */
  color: string;
  /** 該群組底下的單字清單 */
  entries: VocabEntry[];
}

/** JSON 完整結構（vocab-review-n3.json） */
export interface VocabReviewData {
  /** 資料標題 */
  title: string;
  /** 對應 JLPT 級別 */
  level: string;
  /** 群組清單 */
  groups: VocabGroup[];
}

// ── Quiz (4-choice) types ────────────────────────────────────────────────────

/** 單字測驗單一選項 */
export interface VocabQuizOption {
  /** 選項 id，格式 `{entry-id}:c`（正解）或 `{entry-id}:w{n}`（干擾選項） */
  id: string;
  /** 選項顯示文字（單字意思） */
  text: string;
  /** 是否為正解 */
  isCorrect: boolean;
}

/** 單字測驗單一題目 */
export interface VocabQuizQuestion {
  /** 題目 id，格式 `q:{entry-id}` */
  id: string;
  /** 出題的單字 */
  entry: VocabEntry;
  /** 選項清單（四選一，含正解與干擾選項） */
  options: VocabQuizOption[];
}

/** 單字測驗單題作答結果 */
export interface VocabQuizResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
  /** 該題對應的單字（供結果頁顯示錯題內容用） */
  entry: VocabEntry;
}

// ── Filtering (詞性分類) ──────────────────────────────────────────────────────

/** 單詞列表的詞性篩選分類 */
export interface VocabFilterCategory {
  /** 分類 id */
  id: string;
  /** 分類顯示名稱 */
  label: string;
  /** 對應的原始 pos 值（VocabEntry.pos） */
  pos: string[];
}

/** 單詞列表「單字詞性」篩選列的可選分類 */
export const VOCAB_FILTER_CATEGORIES: VocabFilterCategory[] = [
  { id: 'verb', label: '動詞', pos: ['verb'] },
  { id: 'compound-verb', label: '複合動詞', pos: ['compound-verb'] },
  { id: 'adjective', label: '形容詞', pos: ['adjective', 'noun-adj'] },
  { id: 'adverb', label: '副詞・擬態語', pos: ['adverb', 'adverb-onomatopoeia'] },
  { id: 'noun', label: '名詞', pos: ['noun', 'noun-katakana'] },
];

/** 單字資料目前收錄的 JLPT 級別 */
export type VocabLevel = 'N3' | 'N2';

/** 單詞列表的級別篩選：全部 or 單一級別 */
export type VocabLevelFilter = 'all' | VocabLevel;

/** 單詞列表「級別」篩選列的可選級別（依序顯示） */
export const VOCAB_LEVELS: VocabLevel[] = ['N3', 'N2'];

/** 取得單字級別（未填 level 的原有單字視為 N3） */
export function vocabEntryLevel(entry: VocabEntry): VocabLevel {
  return entry.level ?? 'N3';
}

/** 單詞列表的常考標記篩選：全部 or 只看常考 or 個人複習整理 */
export type VocabTagFilter = 'all' | 'frequent' | 'personal-review';

/** 原始 pos 值 → 顯示用中文標籤 */
export const POS_DISPLAY_LABEL: Record<string, string> = {
  verb: '動詞',
  adjective: '形容詞',
  'noun-adj': '形容詞',
  adverb: '副詞',
  'adverb-onomatopoeia': '擬態語',
  noun: '名詞',
  'noun-katakana': '名詞',
  expression: '慣用語',
  'compound-verb': '複合動詞',
};
