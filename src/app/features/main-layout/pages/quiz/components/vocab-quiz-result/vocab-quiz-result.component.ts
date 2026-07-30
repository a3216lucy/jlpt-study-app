// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
import { VocabAudioService } from '../../vocab-audio.service';
// Models
import type { VocabEntry, VocabQuizResult } from '../../quiz.model';

@Component({
  selector: 'app-vocab-quiz-result',
  templateUrl: './vocab-quiz-result.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabQuizResultComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  private readonly audio = inject(VocabAudioService);
  readonly Math = Math;

  // Public Handlers
  // --------------------------------------------------------------------
  speakEntry(entry: VocabEntry): void {
    this.audio.speak(entry);
  }

  selectedOptionText(result: VocabQuizResult): string {
    const question = this.store.quizQuestions().find((q) => q.id === result.questionId);
    return question?.options.find((o) => o.id === result.selectedOptionId)?.text ?? '—';
  }

  markedQuestionsInQuiz() {
    return this.store.quizQuestions().filter((q) => this.store.isWordMarked(q.entry.id));
  }
}
