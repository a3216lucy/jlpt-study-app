// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { PastExamSection } from '@core/config/past-exam-catalog';
// Store
import { PastExamStore } from '../../past-exam.store';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
};

@Component({
  selector: 'app-past-exam-result',
  templateUrl: './past-exam-result.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamResultComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

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
}
