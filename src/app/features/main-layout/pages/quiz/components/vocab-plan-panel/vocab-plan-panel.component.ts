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
}
