/**
 * 假名標註工具：詞表用 `{漢字|よみ}` 標出要加讀音的部分（送り仮名不標），
 * 輸出 `<ruby>` HTML（其餘文字已跳脫）。每一頁自己準備詞表，只收該頁出現的日文詞。
 */
export interface FuriganaRule {
  key: string;
  html: string;
}

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

function compile(entry: string): FuriganaRule {
  let key = '';
  let html = '';
  let rest = entry;
  const re = /\{([^|}]+)\|([^}]+)\}/;
  for (let m = re.exec(rest); m; m = re.exec(rest)) {
    const before = rest.slice(0, m.index);
    key += before + m[1];
    html += `${before}<ruby>${m[1]}<rt>${m[2]}</rt></ruby>`;
    rest = rest.slice(m.index + m[0].length);
  }
  return { key: key + rest, html: html + rest };
}

/** 依詞表建立轉換函式；`highlight` 內的字出現在已標註的詞裡時，整個詞加粗上色 */
export function createFurigana(entries: readonly string[]): (text: string, highlight?: readonly string[]) => string {
  const rules = entries.map(compile).sort((a, b) => b.key.length - a.key.length);
  return (text, highlight = []) => {
    let out = '';
    let i = 0;
    while (i < text.length) {
      const rule = rules.find((r) => text.startsWith(r.key, i));
      if (rule) {
        const hit = highlight.some((h) => h && rule.key.includes(h));
        out += hit ? `<b class="text-accent">${rule.html}</b>` : rule.html;
        i += rule.key.length;
      } else {
        out += ESCAPES[text[i]] ?? text[i];
        i += 1;
      }
    }
    return out;
  };
}

/** 漢字（かな）：括號裡全是假名才轉換，避免誤轉中文註解 */
const PAREN_READING = /([一-鿿々〆ヶ]+)（([ぁ-ゖァ-ヺー・]+)）/g;

/** 把「漢字（かな）」轉成 `<ruby>`（其餘文字已跳脫），給 `[innerHTML]` 使用 */
export function parenToRuby(text: string): string {
  const escaped = text.replace(/[&<>]/g, (c) => ESCAPES[c]);
  return escaped.replace(PAREN_READING, '<ruby>$1<rt>$2</rt></ruby>');
}
