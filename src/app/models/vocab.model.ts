export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'GEN';
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression' | 'other';

export interface Sentence {
  jp: string;
  zh: string;
}

export interface VocabWord {
  id: string;
  kanji: string;
  furigana: string;
  meaning: string;
  level: JlptLevel;
  type: WordType;
  sentences: Sentence[];
  audio?: string;
}
