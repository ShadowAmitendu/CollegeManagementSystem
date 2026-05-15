export type CmsRole =
  | 'admin'
  | 'principal'
  | 'hod'
  | 'professor'
  | 'student'
  | 'cr'
  | 'librarian'
  | 'staff';

export type PermissionCode = `${string}.${'read' | 'create' | 'update' | 'delete' | 'manage'}`;

export interface RbacPrincipal {
  readonly userId: string;
  readonly roles: readonly CmsRole[];
  readonly permissions: readonly PermissionCode[];
}

export function hasPermission(principal: RbacPrincipal | null, permission: PermissionCode): boolean {
  return principal?.permissions.includes(permission) ?? false;
}
