// Cores
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
// Shared
import { PAST_EXAM_CATALOG } from '@core/config/past-exam-catalog';
import type { ExamAttempt } from '@core/models/exam-attempt.model';
// Store
import { PastExamStore } from '../../past-exam.store';
// Utils
import { scopeLabel } from '../../attempt.util';

/** 預設顯示的紀錄筆數，其餘收合 */
const COLLAPSED_COUNT = 3;

/** 一份考卷的歷次作答：第 N 次練習／實際演練，點進去回顧（進行中的練習則繼續作答） */
@Component({
  selector: 'app-past-exam-attempts',
  templateUrl: './past-exam-attempts.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamAttemptsComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Inputs / State
  // --------------------------------------------------------------------
  /** 考卷 id；錯題本的練習紀錄傳 `notebook` */
  readonly examId = input.required<string>();
  private readonly sections = computed(() => PAST_EXAM_CATALOG.find((e) => e.id === this.examId())?.sections ?? []);
  readonly showAll = signal(false);

  readonly attempts = computed(() => this.store.attemptsByExam().get(this.examId()) ?? []);
  readonly visible = computed(() => (this.showAll() ? this.attempts() : this.attempts().slice(0, COLLAPSED_COUNT)));
  readonly hiddenCount = computed(() => Math.max(0, this.attempts().length - COLLAPSED_COUNT));

  // Public Handlers
  // --------------------------------------------------------------------
  scopeText(a: ExamAttempt): string {
    return scopeLabel(a.scopeKey, this.sections());
  }

  percent(a: ExamAttempt): number {
    return a.total > 0 ? Math.round((a.score / a.total) * 100) : 0;
  }

  answeredCount(a: ExamAttempt): number {
    return Object.keys(a.answers).length;
  }

  dateText(a: ExamAttempt): string {
    const ts = a.completedAt ?? a.startedAt;
    const d = ts?.toDate?.();
    return d ? `${d.getMonth() + 1}/${d.getDate()}` : '';
  }

  open(a: ExamAttempt): void {
    if (a.status === 'in-progress') void this.store.resumeAttempt(a);
    else void this.store.openReview(a);
  }
}
