// Cores
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Shared
import type { PastExamSection } from '@core/config/past-exam-catalog';
import { formatClock } from '@core/config/exam-timing';
// Store
import { PastExamStore } from '../../past-exam.store';
// Components
import { PastExamExplanationComponent } from '../past-exam-explanation/past-exam-explanation.component';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  listening: '聴解',
};

@Component({
  selector: 'app-past-exam-result',
  templateUrl: './past-exam-result.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PastExamExplanationComponent],
})
export class PastExamResultComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // State
  // --------------------------------------------------------------------
  /** 實際演練的用時（分：秒） */
  readonly mockElapsed = computed(() => {
    const info = this.store.attempt()?.mock;
    return info ? formatClock(info.elapsedSec) : '';
  });

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(section: PastExamSection): string {
    return CATEGORY_LABEL[section.category] ?? section.category;
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : percent >= 60 ? 'text-[#B08514]' : 'text-accent';
  }

  scoreBarClass(percent: number): string {
    return percent >= 80 ? 'bg-matcha' : percent >= 60 ? 'bg-sun-yellow' : 'bg-accent';
  }

  /** 使用者選的選項編號（1–4）；沒作答回傳 null */
  pickedNumber(options: { id: string }[], pickedId: string | null): number | null {
    if (!pickedId) return null;
    const i = options.findIndex((o) => o.id === pickedId);
    return i >= 0 ? i + 1 : null;
  }

  correctNumber(options: { isCorrect: boolean }[]): number {
    return options.findIndex((o) => o.isCorrect) + 1;
  }

  openFullReview(): void {
    const attempt = this.store.attempt();
    if (attempt) void this.store.openReview(attempt);
  }
}
