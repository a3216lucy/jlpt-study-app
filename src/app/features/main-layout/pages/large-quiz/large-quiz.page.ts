// Cores
import { Component, inject } from '@angular/core';
// Angular
import { CommonModule } from '@angular/common';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
// Shared
import type { ExamOption } from '@shared/models/exam-question.model';
import type { JlptLevel } from '@shared/models/vocab.model';
// Store
import { LargeQuizStore } from './large-quiz.store';

@Component({
  selector: 'app-large-quiz',
  templateUrl: './large-quiz.page.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
  providers: [LargeQuizStore],
})
export class LargeQuizPage {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);
  readonly Math = Math;

  // State & Form
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Public Handlers
  // --------------------------------------------------------------------
  levelDescription(level: JlptLevel): string {
    const map: Record<JlptLevel, string> = {
      N5: '入門基礎',
      N4: '初級進階',
      N3: '中級過渡',
      N2: '進階實戰',
      N1: '高階挑戰',
      GEN: '綜合練習',
    };
    return map[level] ?? '綜合練習';
  }

  optionCardClass(option: ExamOption): string {
    if (!this.store.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]';
    }
    if (option.isCorrect) return 'border-green-500 bg-green-50 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: ExamOption): string {
    if (!this.store.answered()) return 'bg-slate-100 text-slate-600';
    if (option.isCorrect) return 'bg-green-100 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-400';
  }
}
