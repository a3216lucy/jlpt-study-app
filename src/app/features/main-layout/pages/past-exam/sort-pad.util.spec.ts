import { emptySlots, firstEmptySlot, parseSortStem, placeChip, poolOf, removeChip, stemWithoutAnswer } from './sort-pad.util';

describe('sort-pad.util', () => {
  it('N2 寫法（＿＿ ＿＿ ★ ＿＿）應該解析出 4 個空格與★位置，並保留答案行', () => {
    const p = parseSortStem('料理雑誌 ＿＿ ★ ＿＿ ＿＿、うまく膨らまなかった。\n正しい語順：[レシピに書いてある②] [★とおりに③]');
    expect(p).not.toBeNull();
    expect(p!.slotCount).toBe(4);
    expect(p!.parts.filter((x) => x.kind === 'slot').map((x) => x.star)).toEqual([false, true, false, false]);
    expect(p!.parts[0]).toEqual({ kind: 'text', text: '料理雑誌 ' });
    expect(p!.orderLine).toContain('正しい語順');
  });

  it('單字寬的 ＿ ＿ ★ ＿ 與緊貼文字的空格也要能解析', () => {
    const p = parseSortStem('今年の夏も暑いが、＿ ＿ ★ ＿ずっと涼しく感じる。\n①異常な　②比べると');
    expect(p!.slotCount).toBe(4);
    expect(p!.orderLine).toBeNull();
  });

  it('___①___ 帶編號的寫法也要能解析，★ 在編號格內', () => {
    const p = parseSortStem('私は小説を2冊と、___①___ ___②___ ___★___ ___③___本を1冊買った。\n①小説2冊と');
    expect(p!.slotCount).toBe(4);
    expect(p!.parts.filter((x) => x.kind === 'slot').map((x) => x.star)).toEqual([false, false, true, false]);
  });

  it('空格數不是 4 或沒有★就回傳 null', () => {
    expect(parseSortStem('これは＿＿ ★ ＿＿です。')).toBeNull();
    expect(parseSortStem('普通の問題です。')).toBeNull();
    expect(parseSortStem('')).toBeNull();
  });

  it('stemWithoutAnswer 應該去掉「正しい語順」答案行，但保留對話題的其他行', () => {
    expect(stemWithoutAnswer('A ＿＿ ★ B\n正しい語順：[x]')).toBe('A ＿＿ ★ B');
    expect(stemWithoutAnswer('上司「準備は？」\n部下「ええ、（　）です。」')).toBe('上司「準備は？」\n部下「ええ、（　）です。」');
  });

  it('placeChip／removeChip／poolOf 應該正確移動、交換與退回', () => {
    let s = emptySlots();
    s = placeChip(s, 2, 0);
    s = placeChip(s, 1, 3);
    expect(s).toEqual([2, null, null, 1]);
    expect(poolOf(s, 4)).toEqual([0, 3]);
    expect(firstEmptySlot(s)).toBe(1);

    // 移動：選項 1 從空格 3 搬到空格 0（互換）
    s = placeChip(s, 1, 0);
    expect(s).toEqual([1, null, null, 2]);

    // 放進已有選項的空格：原本的退回選項區
    s = placeChip(s, 0, 0);
    expect(s).toEqual([0, null, null, 2]);
    expect(poolOf(s, 4)).toEqual([1, 3]);

    s = removeChip(s, 3);
    expect(s).toEqual([0, null, null, null]);
    expect(firstEmptySlot(emptySlots())).toBe(0);
    expect(firstEmptySlot([0, 1, 2, 3])).toBe(-1);
  });
});
