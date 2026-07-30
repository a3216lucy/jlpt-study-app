// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { ExamOption } from '@core/models/exam-question.model';
// Store
import { LargeQuizStore } from '../../large-quiz.store';

@Component({
  selector: 'app-large-quiz-taking',
  templateUrl: './large-quiz-taking.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeQuizTakingComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);

  // Public Handlers
  // --------------------------------------------------------------------
  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
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
