// Cores
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Shared
import type { ExamCategory } from '@core/models/exam-question.model';
import type { JlptLevel } from '@core/models/vocab.model';
// Store
import { PastExamStore } from '../../past-exam.store';
// Models
import type { NotebookEntry } from '../../past-exam.model';
// Utils
import { splitPassage } from '../../passage.util';
import { questionNumber } from '../../review-lists.util';
// Components
import { PastExamAttemptsComponent } from '../past-exam-attempts/past-exam-attempts.component';
import { PastExamExplanationComponent } from '../past-exam-explanation/past-exam-explanation.component';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  listening: '聴解',
};

/** 跨回次錯題本（唯讀）：還沒掌握的題／單字清單／文法清單／標記題 */
@Component({
  selector: 'app-past-exam-notebook',
  templateUrl: './past-exam-notebook.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, PastExamAttemptsComponent, PastExamExplanationComponent],
})
export class PastExamNotebookComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Constants
  // --------------------------------------------------------------------
  readonly categories: { value: ExamCategory | 'all'; label: string }[] = [
    { value: 'all', label: '全部科目' },
    { value: 'vocabulary', label: '語彙' },
    { value: 'grammar', label: '文法' },
    { value: 'reading', label: '読解' },
    { value: 'listening', label: '聴解' },
  ];

  // State
  // --------------------------------------------------------------------
  readonly wrongShown = computed(() => this.store.notebookWrong().slice(0, this.store.notebookLimit()));
  readonly markedShown = computed(() => this.store.notebookMarked().slice(0, this.store.notebookLimit()));
  readonly hasMoreWrong = computed(() => this.store.notebookWrong().length > this.store.notebookLimit());
  readonly hasMoreMarked = computed(() => this.store.notebookMarked().length > this.store.notebookLimit());
  readonly isEmpty = computed(() => this.store.notebookEntries().length === 0);

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(category: string): string {
    return CATEGORY_LABEL[category] ?? category;
  }

  levelValue(value: string): JlptLevel | 'all' {
    return value as JlptLevel | 'all';
  }

  numberOf(e: NotebookEntry): number | null {
    return questionNumber(e.question);
  }

  passageOf(e: NotebookEntry) {
    return splitPassage(e.question.prompt);
  }

  /** 文法「已學會」標記用的 key */
  grammarKey(g: { point: string; tip: string }): string {
    return `${g.point}|${g.tip}`;
  }

  onShowLearnedToggle(event: Event): void {
    this.store.setNotebookShowLearned((event.target as HTMLInputElement).checked);
  }

  onLevelChange(event: Event): void {
    this.store.setNotebookLevel(this.levelValue((event.target as HTMLSelectElement).value));
  }

  onCategoryChange(event: Event): void {
    this.store.setNotebookCategory((event.target as HTMLSelectElement).value as ExamCategory | 'all');
  }

  onExamChange(event: Event): void {
    this.store.setNotebookExam((event.target as HTMLSelectElement).value);
  }

  onMockToggle(event: Event): void {
    void this.store.setNotebookIncludeMock((event.target as HTMLInputElement).checked);
  }
}
