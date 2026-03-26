import { Routes } from '@angular/router';
import { QuizComponent } from '@features/pages/quiz/quiz';
import { LargeQuizComponent } from '@features/pages/large-quiz/large-quiz';

export const mainLayoutRoutes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'large-quiz',
    component: LargeQuizComponent,
  },
];
