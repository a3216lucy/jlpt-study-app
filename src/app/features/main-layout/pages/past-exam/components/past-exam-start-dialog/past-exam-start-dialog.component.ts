// Cores
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
// Shared
import type { ExamScope } from '@core/models/exam-attempt.model';
import { getExamStages } from '@core/config/exam-timing';
// Store
import { PastExamStore } from '../../past-exam.store';
// Utils
import { scopeKey } from '../../attempt.util';
// Components
import { PastExamDialogComponent } from '../past-exam-dialog/past-exam-dialog.component';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  listening: '聴解',
};

/** 開始作答：選練習模式（可選範圍）或實際演練（官方計時） */
@Component({
  selector: 'app-past-exam-start-dialog',
  templateUrl: './past-exam-start-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PastExamDialogComponent],
})
export class PastExamStartDialogComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // State
  // --------------------------------------------------------------------
  readonly mode = signal<'practice' | 'mock'>('practice');
  readonly scope = signal<ExamScope>({ type: 'all' });

  readonly exam = computed(() => this.store.startDialogExam());
  readonly stages = computed(() => {
    const exam = this.exam();
    return exam ? getExamStages(exam.level) : [];
  });
  readonly totalQuestions = computed(() => this.exam()?.sections.reduce((n, s) => n + s.questionCount, 0) ?? 0);

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(category: string): string {
    return CATEGORY_LABEL[category] ?? category;
  }

  isScope(scope: ExamScope): boolean {
    return scopeKey(this.scope()) === scopeKey(scope);
  }

  groupsOf(sectionId: string) {
    return this.store.startDialogGroups().filter((g) => g.sectionId === sectionId);
  }

  start(): void {
    const exam = this.exam();
    if (!exam) return;
    if (this.mode() === 'mock') void this.store.startMock(exam);
    else void this.store.startPractice(exam, this.scope());
  }
}
