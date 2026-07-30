// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { PastExamEntry, PastExamSection } from '@core/config/past-exam-catalog';
import type { JlptLevel } from '@core/models/vocab.model';
// Store
import { PastExamStore } from '../../past-exam.store';

const CATEGORY_ICON: Record<string, string> = {
  grammar: 'fa-pen',
  vocabulary: 'fa-book',
  reading: 'fa-file-lines',
};

@Component({
  selector: 'app-past-exam-overview',
  templateUrl: './past-exam-overview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamOverviewComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Public Handlers
  // --------------------------------------------------------------------
  categoryIcon(section: PastExamSection): string {
    return CATEGORY_ICON[section.category] ?? 'fa-file';
  }

  examTotalQuestions(exam: PastExamEntry): number {
    return exam.sections.reduce((sum, s) => sum + s.questionCount, 0);
  }
}
