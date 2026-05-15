import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Route, Router } from '@angular/router';

import { Permissions } from '../services/permissions';
import { type PermissionCode } from '../utils/permissions';

function canAccessPermissionRoute(route: { data?: Route['data'] }) {
  const permission = route.data?.['permission'] as PermissionCode | undefined;

  if (!permission) {
    return true;
  }

  if (inject(Permissions).can(permission)) {
    return true;
  }

  return inject(Router).createUrlTree(['/dashboard']);
}

export const permissionGuard: CanActivateFn = (route) => canAccessPermissionRoute(route);
export const permissionCanMatchGuard: CanMatchFn = (route) => canAccessPermissionRoute(route);
