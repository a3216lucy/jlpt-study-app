import type { ExamAttempt } from '@core/models/exam-attempt.model';
import type { ExamQuestion } from '@core/models/exam-question.model';
import { nextAttemptNo, questionStats, scopeKey, scopeLabel, scoreAnswers, selectScopeQuestions, unmasteredQuestionIds } from './attempt.util';

function q(id: string, problemNumber: number, correct = 'a'): ExamQuestion {
  return {
    id,
    level: 'N2',
    category: 'vocabulary',
    type: 'sentence-fill',
    prompt: '',
    options: ['a', 'b', 'c', 'd'].map((k) => ({ id: `${id}-${k}`, text: k, isCorrect: k === correct })),
    correctAnswer: `${id}-${correct}`,
    explanation: '',
    problemNumber,
  };
}

function attempt(partial: Partial<ExamAttempt>): ExamAttempt {
  return {
    id: 'x', examId: 'e1', mode: 'practice', scopeKey: 'all', attemptNo: 1, status: 'completed',
    questionIds: [], answers: {}, markedIds: [], currentIndex: 0, startedAt: null, updatedAt: null,
    completedAt: null, score: 0, total: 0, wrongQuestionIds: [], mock: null, ...partial,
  };
}

/** 測試用的假時間戳（只需要 toMillis） */
const ts = (ms: number) => ({ toMillis: () => ms }) as unknown as ExamAttempt['completedAt'];

describe('attempt.util', () => {
  const sections = [
    { sectionId: 'vocab', questions: [q('v1', 1), q('v2', 1), q('v3', 2)] },
    { sectionId: 'grammar', questions: [q('g1', 7), q('g2', 7)] },
  ];

  it('scopeKey 應該產生穩定字串', () => {
    expect(scopeKey({ type: 'all' })).toBe('all');
    expect(scopeKey({ type: 'section', sectionId: 'vocab' })).toBe('section:vocab');
    expect(scopeKey({ type: 'problem', sectionId: 'vocab', problemNumber: 2 })).toBe('problem:vocab:2');
    expect(scopeKey({ type: 'unmastered' })).toBe('unmastered');
  });

  it('selectScopeQuestions 應該依範圍挑題並保留順序', () => {
    expect(selectScopeQuestions(sections, { type: 'all' }).map((x) => x.question.id)).toEqual(['v1', 'v2', 'v3', 'g1', 'g2']);
    expect(selectScopeQuestions(sections, { type: 'section', sectionId: 'grammar' }).map((x) => x.question.id)).toEqual(['g1', 'g2']);
    expect(selectScopeQuestions(sections, { type: 'problem', sectionId: 'vocab', problemNumber: 1 }).map((x) => x.question.id)).toEqual(['v1', 'v2']);
    expect(selectScopeQuestions(sections, { type: 'unmastered' }, new Set(['v3', 'g2'])).map((x) => x.question.id)).toEqual(['v3', 'g2']);
  });

  it('nextAttemptNo 應該同考卷同模式遞增且不分範圍', () => {
    const list = [
      attempt({ attemptNo: 1, scopeKey: 'all' }),
      attempt({ attemptNo: 2, scopeKey: 'section:vocab' }),
      attempt({ attemptNo: 5, mode: 'mock' }),
      attempt({ examId: 'e2', attemptNo: 9 }),
    ];
    expect(nextAttemptNo(list, 'e1', 'practice')).toBe(3);
    expect(nextAttemptNo(list, 'e1', 'mock')).toBe(6);
    expect(nextAttemptNo([], 'e1', 'practice')).toBe(1);
  });

  it('scoreAnswers 應該把沒作答算成錯題', () => {
    const qs = [q('v1', 1), q('v2', 1), q('v3', 2)];
    const r = scoreAnswers(qs, { v1: 'v1-a', v2: 'v2-b' });
    expect(r.score).toBe(1);
    expect(r.total).toBe(3);
    expect(r.unanswered).toBe(1);
    expect(r.wrongQuestionIds).toEqual(['v2', 'v3']);
  });

  it('unmasteredQuestionIds 應該以最近一次練習結果為準，含錯題本練習、不含實演', () => {
    const list = [
      attempt({ attemptNo: 1, completedAt: ts(1), questionIds: ['e1-v1', 'e1-v2', 'e1-v3'], wrongQuestionIds: ['e1-v1', 'e1-v2'] }),
      // 從錯題本（examId 為 notebook）練習，v1 答對了 → 掌握
      attempt({ examId: 'notebook', attemptNo: 1, completedAt: ts(2), questionIds: ['e1-v1'], wrongQuestionIds: [] }),
      attempt({ mode: 'mock', attemptNo: 1, questionIds: ['e1-v3'], wrongQuestionIds: ['e1-v3'] }),
      attempt({ attemptNo: 3, status: 'in-progress', questionIds: ['e1-v2'], wrongQuestionIds: [] }),
      attempt({ examId: 'e2', attemptNo: 1, questionIds: ['e2-v1'], wrongQuestionIds: ['e2-v1'] }),
    ];
    expect(Array.from(unmasteredQuestionIds(list, 'e1')).sort()).toEqual(['e1-v2']);
  });

  it('scopeLabel 應該轉成給人看的標籤', () => {
    const secs = [{ id: 'vocab', category: 'vocabulary' }, { id: 'grammar', category: 'grammar' }];
    expect(scopeLabel('all', secs)).toBe('整回');
    expect(scopeLabel('section:grammar', secs)).toBe('文法');
    expect(scopeLabel('problem:vocab:4', secs)).toBe('語彙・問題4');
    expect(scopeLabel('unmastered', secs)).toBe('還沒掌握的題');
    expect(scopeLabel('notebook', secs)).toBe('錯題本');
  });

  it('questionStats 應該跨考卷累計錯誤次數並以最近一次為準', () => {
    const list = [
      attempt({ examId: 'e1', attemptNo: 1, questionIds: ['a', 'b'], wrongQuestionIds: ['a', 'b'], markedIds: ['b'] }),
      attempt({ examId: 'e1', attemptNo: 2, questionIds: ['a'], wrongQuestionIds: [], markedIds: [] }),
      attempt({ examId: 'e2', attemptNo: 1, questionIds: ['c'], wrongQuestionIds: ['c'] }),
    ];
    const stats = questionStats(list, false);
    expect(stats.get('a')).toEqual(jasmine.objectContaining({ wrongCount: 1, latestWrong: false }));
    expect(stats.get('b')).toEqual(jasmine.objectContaining({ wrongCount: 1, latestWrong: true, marked: true }));
    expect(stats.get('c')?.latestWrong).toBeTrue();
  });

  it('questionStats 預設不含實演，includeMock 時才計入；進行中的練習只更新標記', () => {
    const list = [
      attempt({ attemptNo: 1, questionIds: ['a'], wrongQuestionIds: [] }),
      attempt({ mode: 'mock', attemptNo: 1, questionIds: ['a'], wrongQuestionIds: ['a'] }),
      attempt({ attemptNo: 2, status: 'in-progress', questionIds: ['a'], wrongQuestionIds: [], markedIds: ['a'] }),
    ];
    const without = questionStats(list, false).get('a')!;
    expect(without.wrongCount).toBe(0);
    expect(without.marked).toBeTrue(); // 進行中的標記有更新
    const withMock = questionStats(list, true).get('a')!;
    expect(withMock.wrongCount).toBe(1);
  });
});
