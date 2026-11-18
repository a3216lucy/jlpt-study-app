// Shared
import type { PastExamEntry, PastExamSection } from '@core/config/past-exam-catalog';
import type { ExamQuestion } from '@core/models/exam-question.model';
import type { QuestionStat } from './attempt.util';

/** 單題作答結果 */
export interface PastExamResult {
  /** 對應的題目 id */
  questionId: string;
  /** 使用者選擇的選項 id */
  selectedOptionId: string;
  /** 是否答對 */
  isCorrect: boolean;
}

/** 一份考試裡，單一科目的作答統計（結果頁「各科目表現」用） */
export interface ExamSectionScore {
  /** 對應的科目 section */
  section: PastExamSection;
  /** 該科目答對題數 */
  score: number;
  /** 該科目總題數 */
  total: number;
  /** 所屬考卷名稱（錯題本練習會混合多份考卷，結果頁要標出來） */
  examLabel: string;
}

/** 開始對話框裡可選的「單一大題」範圍 */
export interface StartDialogGroup {
  /** 所屬科目 section id */
  sectionId: string;
  /** 問題編號（如 4 → 問題4） */
  number: number;
  /** 大題名稱（如「文脈規定」） */
  label: string;
  /** 該大題題數 */
  count: number;
}

/** 錯題本中的一題（含所屬考卷與科目） */
export interface NotebookItem {
  /** 所屬考卷 */
  exam: PastExamEntry;
  /** 所屬科目 */
  section: PastExamSection;
  /** 題目 */
  question: ExamQuestion;
}

/** 錯題本中的一題＋它跨作答的累計狀態 */
export interface NotebookEntry extends NotebookItem {
  /** 累計狀態（錯幾次、是否仍沒掌握、是否標記） */
  stat: QuestionStat;
}
