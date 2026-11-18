import type { ExamQuestion } from '@core/models/exam-question.model';
import { buildReviewLists, questionNumber } from './review-lists.util';

function make(partial: Partial<ExamQuestion> & { id: string }): ExamQuestion {
  return {
    level: 'N2', category: 'vocabulary', type: 'sentence-fill', prompt: '', questionText: '',
    options: [
      { id: `${partial.id}-a`, text: 'はなれて', isCorrect: true },
      { id: `${partial.id}-b`, text: 'わかれて', isCorrect: false },
    ],
    correctAnswer: `${partial.id}-a`, explanation: '', ...partial,
  };
}

describe('review-lists.util', () => {
  it('questionNumber 應該取 id 尾端題號', () => {
    expect(questionNumber(make({ id: 'n2-2019-07-g-33' }))).toBe(33);
  });

  it('語彙題應該彙整成單字清單並合併同詞', () => {
    const exp = '💡 離れる＝距離上分開。\n【選項解析】\n○1 はなれて：離れる＝分開\n×2 わかれて：別れる＝分別';
    const lists = buildReviewLists([
      make({ id: 'n2-2019-07-v-01', problemNumber: 1, problemLabel: '漢字読み', explanation: exp }),
      make({ id: 'n2-2019-12-v-01', problemNumber: 1, problemLabel: '漢字読み', explanation: exp }),
    ]);
    expect(lists.vocab.length).toBe(1);
    expect(lists.vocab[0].word).toBe('はなれて');
    expect(lists.vocab[0].count).toBe(2);
    expect(lists.vocab[0].note).toBe('離れる＝分開');
    expect(lists.vocab[0].distractors).toEqual([{ text: 'わかれて', note: '別れる＝分別' }]);
    expect(lists.grammar.length).toBe(0);
  });

  it('問題6（用法）應該用題幹的【詞】當單字並取重點當說明', () => {
    const lists = buildReviewLists([
      make({ id: 'n2-2019-07-v-26', problemNumber: 6, questionText: '【保存】次の…', explanation: '💡 保存＝保管。' }),
    ]);
    expect(lists.vocab[0].word).toBe('保存');
    expect(lists.vocab[0].note).toBe('保存＝保管。');
  });

  it('文法題應該彙整成文法清單，読解題不列清單', () => {
    const lists = buildReviewLists([
      make({ id: 'n2-2019-07-g-33', category: 'grammar', problemNumber: 7, explanation: '💡 〜ついでに＝順便。\n【選項解析】\n○1 はなれて：x' }),
      make({ id: 'n2-2019-07-r-55', category: 'reading', explanation: '💡 x' }),
    ]);
    expect(lists.grammar.length).toBe(1);
    expect(lists.grammar[0].tip).toBe('〜ついでに＝順便。');
    expect(lists.vocab.length).toBe(0);
  });

  it('countOf 應該讓每題以累計次數計入', () => {
    const exp = '💡 x\n【選項解析】\n○1 はなれて：離れる＝分開';
    const q = make({ id: 'n2-2019-07-v-01', problemNumber: 1, problemLabel: '漢字読み', explanation: exp });
    const lists = buildReviewLists([q], () => 3);
    expect(lists.vocab[0].count).toBe(3);
  });
});
