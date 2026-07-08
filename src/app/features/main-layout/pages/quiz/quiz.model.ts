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
