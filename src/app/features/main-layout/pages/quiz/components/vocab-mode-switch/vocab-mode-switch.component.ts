// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';

@Component({
  selector: 'app-vocab-mode-switch',
  templateUrl: './vocab-mode-switch.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabModeSwitchComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
}
