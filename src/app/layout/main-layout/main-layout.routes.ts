import { Routes } from '@angular/router';
import { LargeQuizComponent } from '@app/layout/pages/large-quiz/large-quiz';
import { QuizComponent } from '@app/layout/pages/quiz/quiz';
import { GrammarReviewComponent } from '@app/layout/pages/grammar-review/grammar-review';

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
];
