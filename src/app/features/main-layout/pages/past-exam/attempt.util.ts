// Shared
import type { ExamAttempt, ExamAttemptMode, ExamScope } from '@core/models/exam-attempt.model';
import type { ExamQuestion } from '@core/models/exam-question.model';

/** 某一科目的題目集合（依 catalog 的科目順序） */
export interface SectionQuestions {
  /** 對應 catalog 的 section id */
  sectionId: string;
  /** 該科題目 */
  questions: ExamQuestion[];
}

/** 範圍內的一題（含所屬科目） */
export interface ScopedQuestion {
  /** 所屬 section id */
  sectionId: string;
  /** 題目 */
  question: ExamQuestion;
}

/** 練習範圍 ↔ 字串標記（存進 attempt.scopeKey） */
export function scopeKey(scope: ExamScope): string {
  switch (scope.type) {
    case 'all':
      return 'all';
    case 'section':
      return `section:${scope.sectionId}`;
    case 'problem':
      return `problem:${scope.sectionId}:${scope.problemNumber}`;
    case 'unmastered':
      return 'unmastered';
  }
}

/** 依範圍挑出題目；`unmastered` 以傳入的題目 id 集合篩選 */
export function selectScopeQuestions(
  sections: SectionQuestions[],
  scope: ExamScope,
  unmasteredIds: ReadonlySet<string> = new Set(),
): ScopedQuestion[] {
  const out: ScopedQuestion[] = [];
  for (const { sectionId, questions } of sections) {
    for (const question of questions) {
      const keep =
        scope.type === 'all' ||
        (scope.type === 'section' && scope.sectionId === sectionId) ||
        (scope.type === 'problem' && scope.sectionId === sectionId && question.problemNumber === scope.problemNumber) ||
        (scope.type === 'unmastered' && unmasteredIds.has(question.id));
      if (keep) out.push({ sectionId, question });
    }
  }
  return out;
}

/** 同一份考卷、同一種模式的下一個次數（從 1 開始，不分範圍） */
export function nextAttemptNo(attempts: readonly ExamAttempt[], examId: string, mode: ExamAttemptMode): number {
  const max = attempts
    .filter((a) => a.examId === examId && a.mode === mode)
    .reduce((m, a) => Math.max(m, a.attemptNo), 0);
  return max + 1;
}

/** 計分結果 */
export interface AttemptScore {
  /** 答對題數 */
  score: number;
  /** 總題數 */
  total: number;
  /** 答錯或沒作答的題目 id（沒作答也算錯題，才會出現在錯題清單） */
  wrongQuestionIds: string[];
  /** 沒作答的題數 */
  unanswered: number;
}

/** 依作答計分 */
export function scoreAnswers(questions: readonly ExamQuestion[], answers: Readonly<Record<string, string>>): AttemptScore {
  let score = 0;
  let unanswered = 0;
  const wrongQuestionIds: string[] = [];
  for (const q of questions) {
    const picked = answers[q.id];
    if (!picked) {
      unanswered++;
      wrongQuestionIds.push(q.id);
    } else if (picked === q.correctAnswer) {
      score++;
    } else {
      wrongQuestionIds.push(q.id);
    }
  }
  return { score, total: questions.length, wrongQuestionIds, unanswered };
}

/** 錯題本練習的 examId（一次作答可含多份考卷的題目，所以不對應某一份考卷） */
export const NOTEBOOK_EXAM_ID = 'notebook';

/**
 * 某份考卷「目前還沒掌握」的題目：每題以最近一次完成的練習為準（含從錯題本練習的結果），
 * 之前錯、後來練習答對的就移除。實際演練不計入。題目 id 以考卷 id 開頭。
 */
export function unmasteredQuestionIds(attempts: readonly ExamAttempt[], examId: string): Set<string> {
  const out = new Set<string>();
  for (const [id, stat] of questionStats(attempts, false)) {
    if (stat.latestWrong && id.startsWith(`${examId}-`)) out.add(id);
  }
  return out;
}

const CATEGORY_LABEL: Record<string, string> = { vocabulary: '語彙', grammar: '文法', reading: '読解', listening: '聴解' };

/** 把 `scopeKey` 轉成給人看的標籤（整回／語彙／語彙・問題4／還沒掌握） */
export function scopeLabel(key: string, sections: readonly { id: string; category: string }[]): string {
  const categoryOf = (sectionId: string): string => {
    const section = sections.find((s) => s.id === sectionId);
    return section ? (CATEGORY_LABEL[section.category] ?? section.category) : sectionId;
  };
  if (key === 'all') return '整回';
  if (key === 'unmastered') return '還沒掌握的題';
  if (key === 'notebook') return '錯題本';
  const [type, sectionId, n] = key.split(':');
  if (type === 'section') return categoryOf(sectionId);
  if (type === 'problem') return `${categoryOf(sectionId)}・問題${n}`;
  return key;
}

/** 某題在所有作答中的累計狀態（錯題本用） */
export interface QuestionStat {
  /** 累計答錯（含未作答）次數 */
  wrongCount: number;
  /** 最近一次完成的作答是否仍是錯的＝「還沒掌握」 */
  latestWrong: boolean;
  /** 最近一次包含此題的作答是否標記了它 */
  marked: boolean;
  /** 最近一次答錯的時間（毫秒）；沒錯過為 0 */
  lastWrongMs: number;
}

/** 一次作答的時間：完成時間優先，其次開始時間；剛建立、時間戳還沒回來的視為最新 */
export function attemptTimeMs(a: ExamAttempt, now: number = Date.now()): number {
  return a.completedAt?.toMillis?.() ?? a.startedAt?.toMillis?.() ?? now;
}

/**
 * 跨考卷彙整每題的狀態。已完成的練習一定計入，已完成的實演只在 `includeMock` 時計入；
 * 進行中的練習只用來更新「標記」（沒作答完不判對錯）。依時間先後處理，每題以最近一次為準。
 */
export function questionStats(attempts: readonly ExamAttempt[], includeMock: boolean): Map<string, QuestionStat> {
  const now = Date.now();
  const list = attempts
    .filter((a) => (a.mode === 'practice' ? true : includeMock && a.status === 'completed'))
    .map((a) => ({ a, time: attemptTimeMs(a, now) }))
    .sort((x, y) => x.time - y.time || x.a.attemptNo - y.a.attemptNo);
  const map = new Map<string, QuestionStat>();
  for (const { a, time } of list) {
    const wrong = new Set(a.wrongQuestionIds);
    const marked = new Set(a.markedIds);
    for (const id of a.questionIds) {
      const s = map.get(id) ?? { wrongCount: 0, latestWrong: false, marked: false, lastWrongMs: 0 };
      s.marked = marked.has(id);
      if (a.status === 'completed') {
        const isWrong = wrong.has(id);
        s.latestWrong = isWrong;
        if (isWrong) {
          s.wrongCount++;
          s.lastWrongMs = time;
        }
      }
      map.set(id, s);
    }
  }
  return map;
}
