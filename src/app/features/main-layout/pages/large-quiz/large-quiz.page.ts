// Cores
import { Component, inject } from '@angular/core';
// Shared
import type { ExamOption, ExamQuestion } from '@shared/models/exam-question.model';
import type { JlptLevel } from '@shared/models/vocab.model';
// Store
import { LargeQuizStore } from './large-quiz.store';

@Component({
  selector: 'app-large-quiz',
  templateUrl: './large-quiz.page.html',
  standalone: true,
  providers: [LargeQuizStore],
})
export class LargeQuizPage {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);

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

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  optionCardClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id
      ? 'border-accent bg-accent-soft text-ink'
      : 'border-border bg-surface text-ink hover:border-accent/40 hover:bg-accent-soft/30';
  }

  optionPrefixClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id ? 'bg-accent text-white' : 'bg-bg text-text-secondary';
  }

  scorePercent(): number {
    const total = this.store.questions().length;
    return total > 0 ? Math.round((this.store.score() / total) * 100) : 0;
  }

  selectedOptionText(question: ExamQuestion, optionId: string): string {
    return question.options.find((o) => o.id === optionId)?.text ?? '—';
  }

  correctOptionText(question: ExamQuestion): string {
    return question.options.find((o) => o.isCorrect)?.text ?? '—';
  }
}
