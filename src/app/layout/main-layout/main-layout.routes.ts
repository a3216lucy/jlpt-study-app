import { Routes } from '@angular/router';
import { LargeQuizComponent } from '@app/layout/pages/large-quiz/large-quiz';
import { QuizComponent } from '@app/layout/pages/quiz/quiz';
import { GrammarReviewComponent } from '@app/layout/pages/grammar-review/grammar-review';
import { PastExamComponent } from '@app/layout/pages/past-exam/past-exam';
import { VocabReviewComponent } from '@app/layout/pages/vocab-review/vocab-review';

export const mainLayoutRoutes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'large-quiz',
    component: LargeQuizComponent,
  },
  {
    path: 'grammar-review',
    component: GrammarReviewComponent,
  },
  {
    path: 'past-exam',
    component: PastExamComponent,
  },
  {
    path: 'vocab-review',
    component: VocabReviewComponent,
  },
];
