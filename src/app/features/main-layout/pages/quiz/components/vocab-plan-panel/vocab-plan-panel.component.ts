// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
// Models
import { VOCAB_LEVELS } from '../../quiz.model';

@Component({
  selector: 'app-vocab-plan-panel',
  templateUrl: './vocab-plan-panel.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabPlanPanelComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  readonly Math = Math;

  // Constants
  // --------------------------------------------------------------------
  readonly goalOptions = [5, 10, 15, 20];
  readonly levelOptions = VOCAB_LEVELS;

  /** 自訂每日新單字數（1–500） */
  onDailyInput(event: Event): void {
    const n = Math.round(Number((event.target as HTMLInputElement).value));
    if (Number.isFinite(n) && n >= 1) this.store.setCreatePlanDaily(Math.min(n, 500));
  }
}
