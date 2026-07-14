/**
 * JLPT 官方考試日期通常為每年 7 月、12 月的第一個週日，此處先寫死下一次考試日期。
 * TODO: 之後應讓使用者在個人設定中選擇報考級別與日期，而非寫死常數。
 */
export const NEXT_JLPT_EXAM_DATE = '2026-12-06';

export function daysUntilNextExam(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(NEXT_JLPT_EXAM_DATE);
  return Math.ceil((exam.getTime() - today.getTime()) / 86_400_000);
}
