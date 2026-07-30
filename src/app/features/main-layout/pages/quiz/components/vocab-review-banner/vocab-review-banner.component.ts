// Cores
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';

type Variant = 'wrong' | 'marked';

interface VariantConfig {
  icon: string;
  title: string;
  count: number;
  containerClass: string;
  iconCircleClass: string;
  iconColorClass: string;
  flashcardButtonClass: string;
  quizButtonClass: string;
}

@Component({
  selector: 'app-vocab-review-banner',
  templateUrl: './vocab-review-banner.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabReviewBannerComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);

  // Inputs
  // --------------------------------------------------------------------
  readonly variant = input.required<Variant>();

  // Computed
  // --------------------------------------------------------------------
  readonly config = computed<VariantConfig>(() => {
    if (this.variant() === 'wrong') {
      return {
        icon: 'fa-triangle-exclamation',
        title: '錯題複習',
        count: this.store.wrongWords().length,
        containerClass: 'border-accent/30 bg-accent-soft/50',
        iconCircleClass: 'bg-white text-accent',
        iconColorClass: 'text-accent',
        flashcardButtonClass: 'border-accent bg-white text-accent hover:bg-accent-soft',
        quizButtonClass: 'bg-accent hover:brightness-105',
      };
    }
    return {
      icon: 'fa-bookmark',
      title: '標記複習',
      count: this.store.markedWords().length,
      containerClass: 'border-sun-yellow/50 bg-[#FFF3D6]/50',
      iconCircleClass: 'bg-white text-[#B08514]',
      iconColorClass: 'text-[#B08514]',
      flashcardButtonClass: 'border-[#B08514] bg-white text-[#B08514] hover:bg-[#FFF3D6]',
      quizButtonClass: 'bg-[#B08514] hover:brightness-105',
    };
  });

  readonly visible = computed(
    () => this.config().count > 0 && !this.store.showCreatePlan(),
  );

  // Public Handlers
  // --------------------------------------------------------------------
  startFlashcard(): void {
    this.store.startFlashcard(this.variant() === 'wrong' ? { wrongOnly: true } : { markedOnly: true });
  }

  startQuiz(): void {
    this.store.startQuiz(this.variant() === 'wrong' ? { wrongOnly: true } : { markedOnly: true });
  }

  clear(): void {
    if (this.variant() === 'wrong') {
      this.store.clearWrongWords();
    } else {
      this.store.clearMarkedWords();
    }
  }
}
