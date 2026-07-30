// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Angular
import { ActivatedRoute } from '@angular/router';
// Store
import { QuizStore } from './quiz.store';
import { VocabAudioService } from './vocab-audio.service';
// Components
import { VocabPlanPanelComponent } from './components/vocab-plan-panel/vocab-plan-panel.component';
import { VocabReviewBannerComponent } from './components/vocab-review-banner/vocab-review-banner.component';
import { VocabModeSwitchComponent } from './components/vocab-mode-switch/vocab-mode-switch.component';
import { VocabFiltersComponent } from './components/vocab-filters/vocab-filters.component';
import { VocabEntryListComponent } from './components/vocab-entry-list/vocab-entry-list.component';
import { VocabFlashcardComponent } from './components/vocab-flashcard/vocab-flashcard.component';
import { VocabQuizQuestionComponent } from './components/vocab-quiz-question/vocab-quiz-question.component';
import { VocabQuizResultComponent } from './components/vocab-quiz-result/vocab-quiz-result.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VocabPlanPanelComponent,
    VocabReviewBannerComponent,
    VocabModeSwitchComponent,
    VocabFiltersComponent,
    VocabEntryListComponent,
    VocabFlashcardComponent,
    VocabQuizQuestionComponent,
    VocabQuizResultComponent,
  ],
  providers: [QuizStore, VocabAudioService],
})
export class QuizPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);

  private readonly route = inject(ActivatedRoute);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init().then(() => {
      if (this.route.snapshot.queryParamMap.get('start') === 'today' && this.store.hasActivePlan()) {
        this.store.startFlashcard({ todayOnly: true });
      }
    });
  }
}
