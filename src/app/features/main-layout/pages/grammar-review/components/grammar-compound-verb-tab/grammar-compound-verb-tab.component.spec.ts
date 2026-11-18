import { parseNoteBlocks } from './grammar-compound-verb-tab.component';

describe('parseNoteBlocks', () => {
  it('①②③ 行拆成小標題＋動詞清單，辨別放進提醒框', () => {
    const blocks = parseNoteBlocks(
      '①方向（從裡到外）：引き出す（抽出）、取り出す（取出）\n②開始義：話し出す（突然說起）\n\n辨別：①前項動詞多是移動性的；②前項動詞常是情緒或自然現象',
    );
    expect(blocks[0]).toEqual({ kind: 'heading', text: '①方向（從裡到外）' });
    expect(blocks[1]).toEqual({
      kind: 'chips',
      items: [
        { word: '引き出す', gloss: '抽出' },
        { word: '取り出す', gloss: '取出' },
      ],
    });
    expect(blocks[2].kind).toBe('heading');
    expect(blocks[4].kind).toBe('callout');
  });

  it('「・A（意思）　・B（意思）」的行轉成清單，「對比：」後面多行放進同一個提醒框', () => {
    const blocks = parseNoteBlocks('表示動作自然結束：\n・食べ終わる（吃完）　・読み終わる（讀完）\n對比：\n〜切る 強調「用光」\n〜終わる 強調「動作結束」');
    expect(blocks.map((b) => b.kind)).toEqual(['heading', 'chips', 'callout']);
    const callout = blocks[2] as { lines: string[] };
    expect(callout.lines.length).toBe(2);
  });

  it('含箭頭或「例：」的行保留成一般文字', () => {
    const blocks = parseNoteBlocks('・覚えつける → 習慣的に覚える\n例：雨が降り出した（突然下起雨）vs 雨が降り始めた（開始下雨）');
    expect(blocks.every((b) => b.kind === 'text')).toBeTrue();
  });
});
