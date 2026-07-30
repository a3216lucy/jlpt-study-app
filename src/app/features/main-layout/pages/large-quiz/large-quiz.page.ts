// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { LargeQuizStore } from './large-quiz.store';
// Components
import { LargeQuizSetupComponent } from './components/large-quiz-setup/large-quiz-setup.component';
import { LargeQuizTakingComponent } from './components/large-quiz-taking/large-quiz-taking.component';
import { LargeQuizResultComponent } from './components/large-quiz-result/large-quiz-result.component';

@Component({
  selector: 'app-large-quiz',
  templateUrl: './large-quiz.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LargeQuizSetupComponent, LargeQuizTakingComponent, LargeQuizResultComponent],
  providers: [LargeQuizStore],
})
export class LargeQuizPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(LargeQuizStore);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}
