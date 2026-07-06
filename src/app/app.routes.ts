import { Routes } from '@angular/router';
import { MainLayout } from '@app/layout/main-layout/main-layout';
import { mainLayoutRoutes } from '@app/layout/main-layout/main-layout.routes';
import { LoginComponent } from '@app/layout/pages/login/login';
import { authGuard, loginGuard } from '@app/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: mainLayoutRoutes,
  },
];
