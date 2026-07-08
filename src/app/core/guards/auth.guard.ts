// Cores
import { inject } from '@angular/core';
// Angular
import { CanActivateFn, Router } from '@angular/router';
// Angular Fire
import { Auth, authState } from '@angular/fire/auth';
// RxJS
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = await firstValueFrom(authState(auth));
  return user ? true : router.createUrlTree(['/login']);
};

export const loginGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = await firstValueFrom(authState(auth));
  return user ? router.createUrlTree(['/']) : true;
};
