/** 排序題題幹裡的一段：純文字或一個空格 */
export interface SortStemPart {
  /** 文字或空格 */
  kind: 'text' | 'slot';
  /** 文字內容（kind 為 text） */
  text?: string;
  /** 第幾個空格（0 起算，kind 為 slot） */
  slot?: number;
  /** 是否為★的空格（題目問的位置） */
  star?: boolean;
}

/** 解析後的排序題題幹 */
export interface ParsedSortStem {
  /** 題幹拆成文字與空格 */
  parts: SortStemPart[];
  /** 空格數（固定 4 才算有效） */
  slotCount: number;
  /** 題幹第二行起的「正しい語順：…」（公布後才顯示），沒有為 null */
  orderLine: string | null;
}

/** 試排區每個空格放的是第幾個選項（0 起算），空的是 null */
export type SortSlots = (number | null)[];

/** 空格記號：＿＿、＿、___①___、___★___ 或單獨的★ */
const SLOT_TOKEN = /[＿_]+[①②③④★]?[＿_]*|★/g;

/**
 * 解析排序題題幹。只看第一行（第二行以後是選項列或「正しい語順」答案，不能在作答前顯示）。
 * 空格數不是 4 就回傳 null（不顯示試排區）。
 */
export function parseSortStem(questionText: string): ParsedSortStem | null {
  if (!questionText) return null;
  const [first, ...rest] = questionText.split('\n');
  const parts: SortStemPart[] = [];
  let last = 0;
  let slot = 0;
  for (const m of first.matchAll(SLOT_TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push({ kind: 'text', text: first.slice(last, idx) });
    parts.push({ kind: 'slot', slot: slot++, star: m[0].includes('★') });
    last = idx + m[0].length;
  }
  if (last < first.length) parts.push({ kind: 'text', text: first.slice(last) });
  if (slot !== 4 || !parts.some((p) => p.kind === 'slot' && p.star)) return null;
  const orderLine = rest.find((l) => l.trim().startsWith('正しい語順')) ?? null;
  return { parts, slotCount: slot, orderLine: orderLine ? orderLine.trim() : null };
}

/** 作答前要顯示的題幹：只移除「正しい語順：…」答案行（其餘行，例如對話題的第二句，要保留） */
export function stemWithoutAnswer(questionText: string): string {
  const idx = questionText.search(/\n\s*正しい語順/);
  return idx >= 0 ? questionText.slice(0, idx) : questionText;
}

export function emptySlots(count = 4): SortSlots {
  return Array.from({ length: count }, () => null);
}

/**
 * 把選項放進空格。若該選項已在別的空格就是「移動」；目標空格已有選項時，
 * 原本的選項換到被移動的選項原本的位置（有的話），否則退回選項區。
 */
export function placeChip(slots: SortSlots, option: number, target: number): SortSlots {
  const next = [...slots];
  const from = next.indexOf(option);
  const occupant = next[target];
  if (from === target) return next;
  if (from >= 0) next[from] = occupant ?? null;
  next[target] = option;
  return next;
}

/** 把某個空格的選項退回選項區 */
export function removeChip(slots: SortSlots, slot: number): SortSlots {
  const next = [...slots];
  next[slot] = null;
  return next;
}

/** 第一個空的空格；全滿回傳 -1 */
export function firstEmptySlot(slots: SortSlots): number {
  return slots.findIndex((s) => s === null);
}

/** 還沒放進空格的選項（維持原順序） */
export function poolOf(slots: SortSlots, optionCount: number): number[] {
  const placed = new Set(slots.filter((s): s is number => s !== null));
  return Array.from({ length: optionCount }, (_, i) => i).filter((i) => !placed.has(i));
}
