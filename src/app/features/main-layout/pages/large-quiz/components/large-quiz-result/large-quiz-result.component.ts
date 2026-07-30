// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { ExamQuestion } from '@core/models/exam-question.model';
// Store
import { LargeQuizStore } from '../../large-quiz.store';

@Component({
  selector: 'app-large-quiz-result',
  templateUrl: './large-quiz-result.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeQuizResultComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);

  // Public Handlers
  // --------------------------------------------------------------------
  scorePercent(): number {
    const total = this.store.questions().length;
    return total > 0 ? Math.round((this.store.score() / total) * 100) : 0;
  }

  selectedOptionText(question: ExamQuestion, optionId: string): string {
    return question.options.find((o) => o.id === optionId)?.text ?? '—';
  }

  correctOptionText(question: ExamQuestion): string {
    return question.options.find((o) => o.isCorrect)?.text ?? '—';
  }
}
