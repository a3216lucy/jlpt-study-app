// Cores
import { Pipe, PipeTransform } from '@angular/core';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const KANJI = /[一-鿿々〆ヶ]/;

function escapeHtml(text: string): string {
  return text.replace(/[&<>]/g, (c) => ESCAPES[c]);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/**
 * 把「單字＋讀音」變成 `<ruby>`：只在漢字上方標讀音，送り仮名（假名部分）不重複。
 * 例：枯れる／かれる → <ruby>枯<rt>か</rt></ruby>れる；取り出す／とりだす → 取(と)り出(だ)す。
 * 對不起來（讀音與假名部分不一致）時，整個詞標上讀音；整個詞沒有漢字就只顯示原字。
 */
export function wordToRuby(word: string, reading: string | null | undefined): string {
  if (!word) return '';
  if (!reading || !KANJI.test(word)) return escapeHtml(word);

  // 「する、来る」「しない、来ない」這類並列：兩邊數量一樣就逐項處理
  for (const sep of ['、', '／']) {
    if (word.includes(sep) && reading.includes(sep)) {
      const ws = word.split(sep);
      const rs = reading.split(sep);
      if (ws.length === rs.length) return ws.map((w, i) => wordToRuby(w, rs[i])).join(sep);
    }
  }

  // 依「漢字連續段／其他字連續段」切開
  const segments = word.match(/[一-鿿々〆ヶ]+|[^一-鿿々〆ヶ]+/g) ?? [word];
  const pattern = segments.map((s) => (KANJI.test(s[0]) ? '(.+?)' : escapeRegExp(s))).join('');
  const m = new RegExp(`^${pattern}$`).exec(reading);
  if (!m) return `<ruby>${escapeHtml(word)}<rt>${escapeHtml(reading)}</rt></ruby>`;

  let group = 1;
  return segments
    .map((s) => (KANJI.test(s[0]) ? `<ruby>${escapeHtml(s)}<rt>${escapeHtml(m[group++])}</rt></ruby>` : escapeHtml(s)))
    .join('');
}

@Pipe({ name: 'wordRuby', standalone: true })
export class WordRubyPipe implements PipeTransform {
  transform(word: string | null | undefined, reading?: string | null): string {
    return wordToRuby(word ?? '', reading);
  }
}
