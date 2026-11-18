import { blankNumber, clozeHtml, splitClozePassage } from './cloze-passage.util';

describe('cloze-passage.util', () => {
  const prompt = '【問題9 文章の文法】次の文章を読んで\n以下は作文である。\n\nタイトル\n\n高さは（５０）。旗も [51] 目立つ。';

  it('blankNumber：全形、半形、括號都能讀出編號', () => {
    expect(blankNumber('高さは（５０）。')).toBe(50);
    expect(blankNumber('みなさん、[48]。')).toBe(48);
    expect(blankNumber('なし')).toBeNull();
  });

  it('splitClozePassage：切出說明與本文，空格少於 2 個回傳 null', () => {
    const r = splitClozePassage(prompt);
    expect(r?.intro).toBe('【問題9 文章の文法】次の文章を読んで 以下は作文である。');
    expect(r?.passage.startsWith('タイトル')).toBeTrue();
    expect(splitClozePassage('【問題3】\n【本文大意】只有大意')).toBeNull();
  });

  it('clozeHtml：目前空格用 mark，其餘不用；內容會跳脫', () => {
    const html = clozeHtml('a<b （５０） c [51]', 50);
    expect(html).toContain('a&lt;b ');
    expect(html).toContain('<mark');
    expect(html.match(/<mark/g)?.length).toBe(1);
    expect(html).toContain('（51）');
  });
});
