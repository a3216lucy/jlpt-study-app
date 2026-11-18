// Shared
import type { ExamQuestion } from '@core/models/exam-question.model';
// Utils
import { parseExplanation } from './explanation.util';

/** 單字清單的易混詞 */
export interface VocabListDistractor {
  /** 選項文字 */
  text: string;
  /** 該詞的含義說明 */
  note: string;
}

/** 單字清單的一筆（同詞多次答錯會合併） */
export interface VocabListItem {
  /** 正解詞或被測詞 */
  word: string;
  /** 含義／重點（取自解析） */
  note: string;
  /** 同題的易混選項 */
  distractors: VocabListDistractor[];
  /** 來源題號（如「問3」） */
  sources: string[];
  /** 答錯次數 */
  count: number;
}

/** 文法清單的一筆 */
export interface GrammarListItem {
  /** 文法型／正解（排序題為★位置的詞） */
  point: string;
  /** 重點（接續、意思、用法） */
  tip: string;
  /** 排序題的正確順序 */
  order: string;
  /** 來源題號 */
  sources: string[];
  /** 答錯次數 */
  count: number;
}

/** 錯題彙整結果 */
export interface ReviewLists {
  /** 語彙題 → 單字清單 */
  vocab: VocabListItem[];
  /** 文法題 → 文法清單 */
  grammar: GrammarListItem[];
}

/** 題目 id 尾端的題號，例如 `n2-2019-07-g-33` → 33；語彙 `v-05` → 5 */
export function questionNumber(question: ExamQuestion): number | null {
  const m = /-(\d+)$/.exec(question.id);
  return m ? Number(m[1]) : null;
}

function sourceLabel(question: ExamQuestion): string {
  const n = questionNumber(question);
  return question.problemLabel ? `${question.problemLabel}${n != null ? `・問${n}` : ''}` : `問${n ?? ''}`;
}

/** 問題6（用法）的被測詞在 questionText 的 `【詞】` 裡 */
function usageWord(question: ExamQuestion): string | null {
  const m = /^【(.+?)】/.exec(question.questionText ?? '');
  return m ? m[1] : null;
}

/**
 * 從答錯的題目彙整單字／文法清單；読解題不列清單（回「錯題」分頁看定位與全文中譯）。
 * 錯題本跨回次時：`countOf` 指定每題要算幾次（預設 1 次）、`examLabelOf` 在來源前加上考卷名稱。
 */
export function buildReviewLists(
  wrongQuestions: readonly ExamQuestion[],
  countOf: (question: ExamQuestion) => number = () => 1,
  examLabelOf: (question: ExamQuestion) => string = () => '',
): ReviewLists {
  const vocab = new Map<string, VocabListItem>();
  const grammar = new Map<string, GrammarListItem>();

  for (const q of wrongQuestions) {
    const parsed = parseExplanation(q.explanation);
    const correctOption = q.options.find((o) => o.isCorrect);
    const correctNote = parsed.options.find((o) => o.correct);

    if (q.category === 'vocabulary') {
      const word = (q.problemNumber === 6 ? usageWord(q) : null) ?? correctOption?.text ?? '';
      if (!word) continue;
      const item =
        vocab.get(word) ??
        ({ word, note: '', distractors: [], sources: [], count: 0 } satisfies VocabListItem);
      if (!item.note) item.note = (q.problemNumber === 6 ? parsed.tip : correctNote?.note) ?? '';
      if (q.problemNumber !== 6) {
        for (const o of parsed.options) {
          if (o.correct || item.distractors.some((d) => d.text === o.text)) continue;
          item.distractors.push({ text: o.text, note: o.note });
        }
      }
      item.sources.push(`${examLabelOf(q)}${sourceLabel(q)}`);
      item.count += countOf(q);
      vocab.set(word, item);
    } else if (q.category === 'grammar') {
      const point = correctOption?.text ?? '';
      if (!point) continue;
      const key = `${point}|${parsed.tip}`;
      const item =
        grammar.get(key) ??
        ({ point, tip: parsed.tip || correctNote?.note || '', order: parsed.order, sources: [], count: 0 } satisfies GrammarListItem);
      item.sources.push(`${examLabelOf(q)}${sourceLabel(q)}`);
      item.count += countOf(q);
      grammar.set(key, item);
    }
  }

  const byCount = <T extends { count: number }>(a: T, b: T): number => b.count - a.count;
  return {
    vocab: Array.from(vocab.values()).sort(byCount),
    grammar: Array.from(grammar.values()).sort(byCount),
  };
}
