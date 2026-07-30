// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { ExamOption } from '@core/models/exam-question.model';
import type { PastExamSection } from '@core/config/past-exam-catalog';
// Store
import { PastExamStore } from '../../past-exam.store';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
};

const PASSAGE_DIVIDER = '─────';

@Component({
  selector: 'app-past-exam-taking',
  templateUrl: './past-exam-taking.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamTakingComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(section: PastExamSection): string {
    return CATEGORY_LABEL[section.category] ?? section.category;
  }

  /** 読解題目的 prompt 內嵌了「本文」，用 ───── 分隔線切開；沒有分隔線就回傳 null（不顯示本文面板） */
  splitPassage(prompt: string): { intro: string; passage: string } | null {
    const idx = prompt.indexOf(PASSAGE_DIVIDER);
    if (idx === -1) return null;
    return {
      intro: prompt.slice(0, idx).trim(),
      passage: prompt.slice(idx + PASSAGE_DIVIDER.length).trim(),
    };
  }

  optionCardClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id
      ? 'border-accent bg-accent-soft text-ink'
      : 'border-border bg-surface text-ink hover:border-accent/40 hover:bg-accent-soft/30';
  }

  optionPrefixClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id ? 'bg-accent text-white' : 'bg-bg text-text-secondary';
  }
}
