// Cores
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Shared
import { formatClock } from '@core/config/exam-timing';
// Store
import { PastExamStore } from '../../past-exam.store';

/** 實際演練的倒數計時：剩 10 分以下轉黃、5 分以下轉紅 */
@Component({
  selector: 'app-past-exam-timer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-heading text-sm font-bold tabular-nums ' + tone()"
      role="timer"
      aria-live="off"
    >
      <i class="fa-solid fa-stopwatch text-xs"></i>{{ clock() }}
    </span>
  `,
})
export class PastExamTimerComponent {
  readonly store = inject(PastExamStore);

  readonly clock = computed(() => formatClock(this.store.remainingSec()));

  readonly tone = computed(() => {
    const sec = this.store.remainingSec();
    if (sec <= 300) return 'bg-accent text-white';
    if (sec <= 600) return 'bg-sun-yellow/60 text-ink';
    return 'bg-bg text-ink border border-border';
  });
}
