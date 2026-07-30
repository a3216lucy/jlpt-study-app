// Models
import type { VocabEntry } from './quiz.model';
import { POS_DISPLAY_LABEL } from './quiz.model';
import type { VocabSRSRecord } from '@core/models/study-plan.model';

const STAGE_STYLE = {
  new: { label: '未開始', bg: 'bg-[#F1EAE0]', text: 'text-text-secondary' },
  learning: { label: '複習中', bg: 'bg-[#FFF3D6]', text: 'text-[#B08514]' },
  learned: { label: '已掌握', bg: 'bg-matcha-soft', text: 'text-matcha' },
} as const;

/** 原始 pos 值轉換為顯示用中文標籤 */
export function posLabel(pos: string): string {
  return POS_DISPLAY_LABEL[pos] ?? pos;
}

/** 依 SRS 紀錄推算單字目前的學習階段顯示樣式 */
export function stageInfo(entry: VocabEntry, srsRecords: Map<string, VocabSRSRecord>) {
  const rec = srsRecords.get(entry.id);
  if (!rec) return STAGE_STYLE.new;
  return rec.stage === 'learned' ? STAGE_STYLE.learned : STAGE_STYLE.learning;
}
