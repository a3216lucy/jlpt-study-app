// Cores
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
// Models
import type { VocabQuizTypeSetting } from '../../quiz.model';

@Component({
  selector: 'app-vocab-mode-switch',
  templateUrl: './vocab-mode-switch.component.html',
  standalone: true,
  host: { class: 'flex flex-col gap-3' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabModeSwitchComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);

  // Constants
  // --------------------------------------------------------------------
  /** 每回題數選項（0＝全部） */
  readonly countOptions = [10, 20, 30, 50, 0];
  readonly typeOptions: { value: VocabQuizTypeSetting; label: string; hint: string }[] = [
    { value: 'mixed', label: '混合', hint: '三種題型隨機出' },
    { value: 'word-meaning', label: '看單字選意思', hint: '讀音作答後才顯示' },
    { value: 'meaning-word', label: '看意思選單字', hint: '從中文選出對應的單字' },
    { value: 'word-reading', label: '看單字選讀音', hint: '只出有漢字的單字' },
  ];

  // State
  // --------------------------------------------------------------------
  /** 單字測驗設定視窗 */
  readonly quizSetupOpen = signal(false);

  // Public Handlers
  // --------------------------------------------------------------------
  startQuiz(): void {
    this.quizSetupOpen.set(false);
    this.store.startQuiz();
  }
}
