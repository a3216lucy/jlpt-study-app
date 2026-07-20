/**
 * JLPT 官方考試日期通常為每年 7 月、12 月的第一個週日。
 * 使用者尚未在個人中心設定應試目標時，以此日期作為預設值。
 */
export const NEXT_JLPT_EXAM_DATE = '2026-12-06';

/** 使用者尚未在個人中心設定應試目標級別時，以此級別作為預設值。 */
export const DEFAULT_TARGET_LEVEL = 'N3';

export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}
