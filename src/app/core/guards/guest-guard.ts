import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { Auth } from '../services/auth';

async function canAccessGuestRoute() {
  const auth = inject(Auth);
  const router = inject(Router);

  await auth.refreshCurrentUser();

  if (!auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
}

export const guestGuard: CanActivateFn = () => canAccessGuestRoute();
export const guestCanMatchGuard: CanMatchFn = () => canAccessGuestRoute();
