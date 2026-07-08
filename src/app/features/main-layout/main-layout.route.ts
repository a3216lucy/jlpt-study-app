// Angular
import { Routes } from '@angular/router';

export const mainLayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/quiz/quiz.page').then(m => m.QuizPage),
  },
  {
    path: 'large-quiz',
    loadComponent: () => import('./pages/large-quiz/large-quiz.page').then(m => m.LargeQuizPage),
  },
  {
    path: 'grammar-review',
    loadComponent: () => import('./pages/grammar-review/grammar-review.page').then(m => m.GrammarReviewPage),
  },
  {
    path: 'past-exam',
    loadComponent: () => import('./pages/past-exam/past-exam.page').then(m => m.PastExamPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
];
