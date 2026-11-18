// Shared
import type { ExamCategory } from '../models/exam-question.model';
import type { JlptLevel } from '../models/vocab.model';

/** 實際演練的一個計時階段（官方每段有獨立時限，交卷後不可回頭） */
export interface ExamStage {
  /** 階段 id */
  id: string;
  /** 顯示名稱 */
  label: string;
  /** 此階段包含的科目 */
  categories: readonly ExamCategory[];
  /** 官方時限（分鐘） */
  minutes: number;
}

/**
 * 官方作答時間（聽解只有答題卡，音檔另外播放；該回沒有聽解題時略過這一段）：
 * - N2：言語知識（文字・語彙・文法）・読解 105 分 → 聴解 50 分
 * - N3：言語知識（文字・語彙）30 分 → 言語知識（文法）・読解 70 分 → 聴解 40 分
 */
const EXAM_STAGES: Partial<Record<JlptLevel, readonly ExamStage[]>> = {
  N2: [
    {
      id: 'all',
      label: '言語知識（文字・語彙・文法）・読解',
      categories: ['vocabulary', 'grammar', 'reading'],
      minutes: 105,
    },
    { id: 'listening', label: '聴解', categories: ['listening'], minutes: 50 },
  ],
  N3: [
    { id: 'vocab', label: '言語知識（文字・語彙）', categories: ['vocabulary'], minutes: 30 },
    { id: 'grammar-reading', label: '言語知識（文法）・読解', categories: ['grammar', 'reading'], minutes: 70 },
    { id: 'listening', label: '聴解', categories: ['listening'], minutes: 40 },
  ],
};

/** 沒有官方設定的級別，退回單一階段、依題數粗估 */
const FALLBACK_MINUTES = 100;

/** 取得某級別的計時階段；傳入 `available`（該回有的科目）時，略過沒有題目的階段 */
export function getExamStages(level: JlptLevel, available?: readonly ExamCategory[]): readonly ExamStage[] {
  const stages = getAllStages(level);
  if (!available) return stages;
  return stages.filter((s) => s.categories.some((c) => available.includes(c)));
}

function getAllStages(level: JlptLevel): readonly ExamStage[] {
  return (
    EXAM_STAGES[level] ?? [
      {
        id: 'all',
        label: '全部題目',
        categories: ['vocabulary', 'grammar', 'reading'],
        minutes: FALLBACK_MINUTES,
      },
    ]
  );
}

/** 距離截止時間還剩幾秒（不會小於 0）；用 `Date.now()` 比對，手機切背景或鎖屏後回來仍準確 */
export function remainingSeconds(deadlineAtMs: number, nowMs: number): number {
  return Math.max(0, Math.ceil((deadlineAtMs - nowMs) / 1000));
}

/** 把秒數格式化成 `H:MM:SS`（不滿一小時為 `MM:SS`） */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
