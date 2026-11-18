import { parseExplanation } from './explanation.util';

const SAMPLE = [
  '💡 〜ついでに＝順便〜。',
  '正確順序：4 仕事から帰る時間でも → 1 開いていて → ★2 買い物するついでに',
  '【選項解析】',
  '×1 開いていて：開著',
  '○2 買い物するついでに：購物時順便',
  '【全文中譯】',
  '第一段。',
  '',
  '第二段。',
].join('\n');

describe('parseExplanation', () => {
  it('應該拆出重點、順序、選項與全文中譯', () => {
    const p = parseExplanation(SAMPLE);
    expect(p.structured).toBeTrue();
    expect(p.tip).toBe('〜ついでに＝順便〜。');
    expect(p.order).toContain('★2 買い物するついでに');
    expect(p.options.length).toBe(2);
    expect(p.options[1]).toEqual({ n: 2, correct: true, text: '買い物するついでに', note: '購物時順便', connect: '', limit: '', why: '' });
    expect(p.passageTranslation).toBe('第一段。\n\n第二段。');
  });

  it('選項說明含冒號時應該只切第一個冒號', () => {
    const p = parseExplanation('【選項解析】\n×3 ばかり：意思：只是');
    expect(p.options[0].text).toBe('ばかり');
    expect(p.options[0].note).toBe('意思：只是');
  });

  it('舊格式沒有區塊標記時應該 structured 為 false 並保留原文', () => {
    const raw = '保存＝讓物品保持原狀保管。 ×1 お金は貯金';
    const p = parseExplanation(raw);
    expect(p.structured).toBeFalse();
    expect(p.raw).toBe(raw);
  });

  it('空字串不應該丟錯', () => {
    expect(parseExplanation('').structured).toBeFalse();
  });

  it('選項下的接續／限制／本題子行應該歸到該選項，不併進說明', () => {
    const raw = [
      '【選項解析】',
      '×1 おきに：每隔〜',
      '  接續：名詞（期間）＋おきに',
      '  限制：表示固定間隔反覆發生',
      '  本題：只隔了一年的單次事件，不能用',
      '○2 ぶりに：隔了〜才再次發生',
      '  本題：「隔了一年」是久違的一次',
    ].join('\n');
    const p = parseExplanation(raw);
    expect(p.options[0].note).toBe('每隔〜');
    expect(p.options[0].connect).toBe('名詞（期間）＋おきに');
    expect(p.options[0].limit).toBe('表示固定間隔反覆發生');
    expect(p.options[0].why).toBe('只隔了一年的單次事件，不能用');
    expect(p.options[1].connect).toBe('');
    expect(p.options[1].why).toBe('「隔了一年」是久違的一次');
  });

  it('聽解：拆出聽力原文與全文中譯', () => {
    const r = parseExplanation('💡 重點\n先去辦公室\n【選項解析】\n○1 a：對\n【聽力原文】\n女：すみません。\n男：はい。\n【全文中譯】\n女：不好意思。');
    expect(r.script).toBe('女：すみません。\n男：はい。');
    expect(r.passageTranslation).toBe('女：不好意思。');
    expect(r.structured).toBeTrue();
  });
});
