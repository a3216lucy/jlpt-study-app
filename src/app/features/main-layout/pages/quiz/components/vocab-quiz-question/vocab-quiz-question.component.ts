// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
import { VocabAudioService } from '../../vocab-audio.service';
// Models
import type { VocabEntry, VocabQuizOption, VocabQuizType } from '../../quiz.model';

@Component({
  selector: 'app-vocab-quiz-question',
  templateUrl: './vocab-quiz-question.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabQuizQuestionComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  private readonly audio = inject(VocabAudioService);

  // Public Handlers
  // --------------------------------------------------------------------
  speakEntry(entry: VocabEntry): void {
    this.audio.speak(entry);
  }

  typeLabel(type: VocabQuizType): string {
    return { 'word-meaning': '看單字選意思', 'meaning-word': '看意思選單字', 'word-reading': '看單字選讀音' }[type];
  }

  typeHint(type: VocabQuizType): string {
    return {
      'word-meaning': '選出最符合的中文意思',
      'meaning-word': '選出符合這個意思的單字',
      'word-reading': '選出這個單字的讀音',
    }[type];
  }

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  optionCardClass(option: VocabQuizOption): string {
    if (!this.store.quizAnswered()) {
      return 'border-border bg-surface text-ink hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/40';
    }
    if (option.isCorrect) return 'border-accent bg-accent-soft text-ink';
    if (option.id === this.store.quizSelectedId()) {
      return 'border-border bg-bg text-text-muted line-through opacity-70';
    }
    return 'border-border bg-surface text-text-muted opacity-60';
  }

  optionBadgeClass(option: VocabQuizOption): string {
    if (this.store.quizAnswered() && option.isCorrect) return 'bg-accent text-white';
    return 'bg-bg text-text-secondary';
  }
}
