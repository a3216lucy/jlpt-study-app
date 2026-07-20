export type PageMode = 'list' | 'flashcard' | 'quiz' | 'quiz-result';

// ── Vocab data types (source: vocab-review-n3.json) ─────────────────────────

export interface VocabExample {
  jp: string;
  zh: string;
}

export interface VocabEntry {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  pos: string;
  examSource?: string;
  examples: VocabExample[];
  confusionNote?: string;
  /** 常考標記：出自實際考古題整理的單字為 true；之後新增的一般 N3 範圍單字可不填 */
  frequentlyTested?: boolean;
}

export interface VocabGroup {
  id: string;
  label: string;
  color: string;
  entries: VocabEntry[];
}

export interface VocabReviewData {
  title: string;
  level: string;
  groups: VocabGroup[];
}

// ── Quiz (4-choice) types ────────────────────────────────────────────────────

export interface VocabQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface VocabQuizQuestion {
  id: string;
  entry: VocabEntry;
  options: VocabQuizOption[];
}

export interface VocabQuizResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  entry: VocabEntry;
}

// ── Filtering (詞性分類) ──────────────────────────────────────────────────────

/** 單詞列表的詞性篩選分類 */
export interface VocabFilterCategory {
  id: string;
  label: string;
  /** 對應的原始 pos 值（VocabEntry.pos） */
  pos: string[];
}

export const VOCAB_FILTER_CATEGORIES: VocabFilterCategory[] = [
  { id: 'verb', label: '動詞', pos: ['verb'] },
  { id: 'adjective', label: '形容詞', pos: ['adjective', 'noun-adj'] },
  { id: 'adverb', label: '副詞・擬態語', pos: ['adverb', 'adverb-onomatopoeia'] },
  { id: 'noun', label: '名詞', pos: ['noun', 'noun-katakana'] },
];

/** 單詞列表的常考標記篩選：全部 or 只看常考 */
export type VocabTagFilter = 'all' | 'frequent';

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
};
