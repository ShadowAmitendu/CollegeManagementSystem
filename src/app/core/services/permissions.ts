import { computed, Injectable, signal } from '@angular/core';

import { type PermissionCode, type RbacPrincipal } from '../utils/permissions';

@Injectable({
  providedIn: 'root',
})
export class Permissions {
  private readonly principalSignal = signal<RbacPrincipal | null>(null);

  readonly principal = this.principalSignal.asReadonly();
  readonly permissions = computed(() => this.principalSignal()?.permissions ?? []);

  setPrincipal(principal: RbacPrincipal | null): void {
    this.principalSignal.set(principal);
  }

  can(permission: PermissionCode): boolean {
    return this.permissions().includes(permission);
  }

  canAny(permissions: readonly PermissionCode[]): boolean {
    return permissions.some((permission) => this.can(permission));
  }
}
