import { parenFuriganaToRuby } from './furigana-paren.pipe';

describe('parenFuriganaToRuby', () => {
  it('漢字（かな）轉成 ruby，送り仮名保留在後面', () => {
    expect(parenFuriganaToRuby('本（ほん）を入（い）れる')).toBe(
      '<ruby>本<rt>ほん</rt></ruby>を<ruby>入<rt>い</rt></ruby>れる',
    );
  });

  it('括號裡不是假名（中文註解）不轉換，且會跳脫 HTML', () => {
    expect(parenFuriganaToRuby('A<B（註解）')).toBe('A&lt;B（註解）');
  });
});
