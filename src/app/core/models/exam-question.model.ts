import { JlptLevel } from './vocab.model';

/** 考題科目：語彙／文法／讀解 */
export type ExamCategory = 'vocabulary' | 'grammar' | 'reading';
/** 題型：一般四選一 or 句型填空 */
export type ExamQuestionType = 'multiple-choice' | 'sentence-fill';

/** 單一選項 */
export interface ExamOption {
  /** 選項 id，格式 `{question-id}-{a/b/c/d}` */
  id: string;
  /** 選項顯示文字 */
  text: string;
  /** 是否為正解 */
  isCorrect: boolean;
}

/** 單一考題 */
export interface ExamQuestion {
  /** 題目 id */
  id: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 所屬科目 */
  category: ExamCategory;
  /** 題型 */
  type: ExamQuestionType;
  /** 題幹（可能含讀解本文，用 `─────` 分隔線與題目分開） */
  prompt: string;
  /** 額外補充的題目文字（部分題型才有） */
  questionText?: string;
  /** 題目中文翻譯 */
  questionTranslation?: string;
  /** 選項清單 */
  options: ExamOption[];
  /** 正解的選項 id，須等於某個 option 的 `id` */
  correctAnswer: string;
  /** 詳解說明 */
  explanation: string;
  /** 額外標籤，供分類或搜尋使用 */
  tags?: string[];
  /** 科目下的子分類題號，如語彙問題1〜5、文法問題1〜3（見 tools/tag-exam-subtypes.mjs） */
  problemNumber?: number;
  /** 子分類顯示名稱，如「漢字読み」「文法形式」「読解（短文）」 */
  problemLabel?: string;
}

/** 一組完整的考題（單一科目、單一級別） */
export interface ExamSet {
  /** 題組 id */
  id: string;
  /** 標題 */
  title: string;
  /** 說明文字 */
  description: string;
  /** 對應 JLPT 級別 */
  level: JlptLevel;
  /** 所屬科目 */
  category: ExamCategory;
  /** 題型 */
  type: ExamQuestionType;
  /** 題目清單 */
  questions: ExamQuestion[];
}
