// Angular
import { Routes } from '@angular/router';
// Guards
import { authGuard, loginGuard } from '@core/guards/auth.guard';
// Routes
import { mainLayoutRoutes } from '@app/features/main-layout/main-layout.route';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@app/features/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadComponent: () => import('@app/features/main-layout/main-layout.container').then(m => m.MainLayoutContainer),
    canActivate: [authGuard],
    children: mainLayoutRoutes,
  },
];
