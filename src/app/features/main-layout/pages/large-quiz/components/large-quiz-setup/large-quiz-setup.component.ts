// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { JlptLevel } from '@core/models/vocab.model';
// Store
import { LargeQuizStore } from '../../large-quiz.store';

const LEVEL_DESCRIPTION: Record<JlptLevel, string> = {
  N5: '入門基礎',
  N4: '初級進階',
  N3: '中級過渡',
  N2: '進階實戰',
  N1: '高階挑戰',
  GEN: '綜合練習',
};

@Component({
  selector: 'app-large-quiz-setup',
  templateUrl: './large-quiz-setup.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeQuizSetupComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Public Handlers
  // --------------------------------------------------------------------
  levelDescription(level: JlptLevel): string {
    return LEVEL_DESCRIPTION[level] ?? '綜合練習';
  }
}
