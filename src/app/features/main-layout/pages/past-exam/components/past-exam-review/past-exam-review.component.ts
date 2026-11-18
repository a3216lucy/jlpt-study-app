// Cores
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Shared
import type { PastExamSection } from '@core/config/past-exam-catalog';
import { formatClock } from '@core/config/exam-timing';
import type { ExamQuestion } from '@core/models/exam-question.model';
// Store
import { PastExamStore } from '../../past-exam.store';
// Utils
import { splitPassage } from '../../passage.util';
import { questionNumber } from '../../review-lists.util';
// Components
import { PastExamExplanationComponent } from '../past-exam-explanation/past-exam-explanation.component';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  listening: '聴解',
};

/** 歷次作答的唯讀回顧：錯題／單字清單／文法清單 */
@Component({
  selector: 'app-past-exam-review',
  templateUrl: './past-exam-review.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PastExamExplanationComponent],
})
export class PastExamReviewComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // State
  // --------------------------------------------------------------------
  readonly summary = computed(() => {
    const a = this.store.attempt();
    if (!a) return '';
    const parts = [`${this.store.score()} / ${this.store.flatItems().length} 題（${this.store.totalPercent()}%）`];
    if (a.mock) parts.push(`用時 ${formatClock(a.mock.elapsedSec)}`);
    return parts.join('・');
  });

  readonly markedCount = computed(() => this.store.markedQuestionIds().size);

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(section: PastExamSection): string {
    return CATEGORY_LABEL[section.category] ?? section.category;
  }

  numberOf(q: ExamQuestion): number | null {
    return questionNumber(q);
  }

  passageOf(q: ExamQuestion) {
    return splitPassage(q.prompt);
  }

  pickedId(q: ExamQuestion): string | null {
    return this.store.answers()[q.id] ?? null;
  }

  isCorrect(q: ExamQuestion): boolean {
    return this.pickedId(q) === q.correctAnswer;
  }

  optionClass(q: ExamQuestion, optionId: string, isCorrect: boolean): string {
    if (isCorrect) return 'border-[#5E9C86] bg-matcha-soft text-ink';
    if (this.pickedId(q) === optionId) return 'border-accent bg-accent-soft text-ink';
    return 'border-border bg-surface text-text-muted';
  }
}
