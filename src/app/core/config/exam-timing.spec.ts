import { formatClock, getExamStages, remainingSeconds } from './exam-timing';

describe('exam-timing', () => {
  it('N2 沒有聽解題時只有一個 105 分鐘階段', () => {
    const stages = getExamStages('N2', ['vocabulary', 'grammar', 'reading']);
    expect(stages.length).toBe(1);
    expect(stages[0].minutes).toBe(105);
    expect(stages[0].categories).toEqual(['vocabulary', 'grammar', 'reading']);
  });

  it('N2 有聽解題時多一段 50 分鐘聴解', () => {
    const stages = getExamStages('N2', ['vocabulary', 'grammar', 'reading', 'listening']);
    expect(stages.map((s) => s.minutes)).toEqual([105, 50]);
    expect(stages[1].categories).toEqual(['listening']);
  });

  it('N3 沒有聽解題時分成語彙 30 分＋文法讀解 70 分兩段', () => {
    const stages = getExamStages('N3', ['vocabulary', 'grammar', 'reading']);
    expect(stages.map((s) => s.minutes)).toEqual([30, 70]);
    expect(stages[0].categories).toEqual(['vocabulary']);
    expect(stages[1].categories).toEqual(['grammar', 'reading']);
  });

  it('沒有官方設定的級別應該退回單一階段', () => {
    expect(getExamStages('N5').length).toBe(1);
  });

  it('remainingSeconds 應該以截止時間計算且不小於 0', () => {
    expect(remainingSeconds(10_000, 4_500)).toBe(6);
    expect(remainingSeconds(10_000, 10_000)).toBe(0);
    expect(remainingSeconds(10_000, 20_000)).toBe(0);
  });

  it('formatClock 應該格式化成 MM:SS 或 H:MM:SS', () => {
    expect(formatClock(65)).toBe('01:05');
    expect(formatClock(3600 + 5 * 60 + 9)).toBe('1:05:09');
    expect(formatClock(-3)).toBe('00:00');
  });
});
