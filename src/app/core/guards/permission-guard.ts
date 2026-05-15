import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Permissions } from '../services/permissions';
import { type PermissionCode } from '../utils/permissions';

export const permissionGuard: CanActivateFn = (route) => {
  const permission = route.data['permission'] as PermissionCode | undefined;

  if (!permission) {
    return true;
  }

  if (inject(Permissions).can(permission)) {
    return true;
  }

  return inject(Router).createUrlTree(['/dashboard']);
};
