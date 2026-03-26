import { Routes } from '@angular/router';
import { MainLayout } from '@app/layout/main-layout/main-layout';
import { mainLayoutRoutes } from '@app/layout/main-layout/main-layout.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: mainLayoutRoutes,
  },
];
