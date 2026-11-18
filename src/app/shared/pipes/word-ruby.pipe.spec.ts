import { wordToRuby } from './word-ruby.pipe';

describe('wordToRuby', () => {
  it('只在漢字上標讀音，送り仮名不重複', () => {
    expect(wordToRuby('枯れる', 'かれる')).toBe('<ruby>枯<rt>か</rt></ruby>れる');
  });

  it('漢字與假名交錯：取り出す', () => {
    expect(wordToRuby('取り出す', 'とりだす')).toBe('<ruby>取<rt>と</rt></ruby>り<ruby>出<rt>だ</rt></ruby>す');
  });

  it('兩個讀法並列：上がる／上げる', () => {
    expect(wordToRuby('上がる／上げる', 'あがる／あげる')).toBe(
      '<ruby>上<rt>あ</rt></ruby>がる／<ruby>上<rt>あ</rt></ruby>げる',
    );
  });

  it('對不起來時整個詞標讀音；沒有漢字就只顯示原字', () => {
    expect(wordToRuby('大人', 'おとな')).toBe('<ruby>大人<rt>おとな</rt></ruby>');
    expect(wordToRuby('カメラ', 'かめら')).toBe('カメラ');
    expect(wordToRuby('ありがとう', 'ありがとう')).toBe('ありがとう');
  });

  it('用「、」並列的多個詞逐項處理', () => {
    expect(wordToRuby('します、来ます', 'します、きます')).toBe('します、<ruby>来<rt>き</rt></ruby>ます');
  });
});
