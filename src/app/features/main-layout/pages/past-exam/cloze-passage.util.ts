/** 文章の文法：題目 prompt 內嵌整篇文章，空格以 `[50]`／`（５０）` 標示 */

const BLANK_SOURCE = '[\\[（(]\\s*([0-9０-９]+)\\s*[\\]）)]';

function toHalfWidth(text: string): string {
  return text.replace(/[０-９]/g, (c) => String(c.charCodeAt(0) - 0xff10));
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 題幹句子裡的空格編號，例如「…（49）、…」→ 49；找不到回傳 null */
export function blankNumber(questionText: string): number | null {
  const m = new RegExp(BLANK_SOURCE).exec(questionText);
  return m ? Number(toHalfWidth(m[1])) : null;
}

/**
 * 把文章の文法題的 prompt 切成「說明」與「整篇文章」。
 * 文章裡至少要有 2 個空格標記才算（N3 部分題目只有大意、沒有原文，回傳 null 維持單句顯示）。
 */
export function splitClozePassage(prompt: string): { intro: string; passage: string } | null {
  const idx = prompt.indexOf('\n\n');
  if (idx === -1) return null;
  const passage = prompt.slice(idx).trim();
  const count = (passage.match(new RegExp(BLANK_SOURCE, 'g')) ?? []).length;
  if (count < 2) return null;
  return { intro: prompt.slice(0, idx).trim().replace(/\n/g, ' '), passage };
}

/** 文章轉 HTML（已跳脫）：目前這題的空格用 `<mark>` 強調，其他空格只標編號 */
export function clozeHtml(passage: string, current: number | null): string {
  let out = '';
  let last = 0;
  for (const m of passage.matchAll(new RegExp(BLANK_SOURCE, 'g'))) {
    const n = Number(toHalfWidth(m[1]));
    const label = `（${n}）`;
    out += escapeHtml(passage.slice(last, m.index));
    out +=
      n === current
        ? `<mark class="rounded bg-accent px-1.5 py-0.5 font-bold text-white">${label}</mark>`
        : `<span class="font-bold text-text-muted">${label}</span>`;
    last = m.index + m[0].length;
  }
  return out + escapeHtml(passage.slice(last));
}
