import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { Auth } from '../services/auth';

async function canAccessAuthenticatedRoute() {
  const auth = inject(Auth);
  const router = inject(Router);

  await auth.refreshCurrentUser();

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
}

export const authGuard: CanActivateFn = () => canAccessAuthenticatedRoute();
export const authCanMatchGuard: CanMatchFn = () => canAccessAuthenticatedRoute();
