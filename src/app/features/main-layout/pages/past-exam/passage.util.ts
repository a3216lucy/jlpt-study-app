const PASSAGE_DIVIDER = '─────';

/** 読解題的 prompt 內嵌「本文」，用 ───── 分隔線切開；沒有分隔線就回傳 null（沒有本文） */
export function splitPassage(prompt: string): { intro: string; passage: string } | null {
  const idx = prompt.indexOf(PASSAGE_DIVIDER);
  if (idx === -1) return null;
  return { intro: prompt.slice(0, idx).trim(), passage: prompt.slice(idx + PASSAGE_DIVIDER.length).trim() };
}
