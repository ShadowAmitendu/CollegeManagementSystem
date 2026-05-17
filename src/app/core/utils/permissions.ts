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

export const ROLE_PERMISSIONS_MAP: Record<CmsRole, readonly PermissionCode[]> = {
  admin: [
    'dashboard.read',
    'students.read',
    'students.create',
    'students.update',
    'students.delete',
    'faculty.read',
    'faculty.create',
    'faculty.update',
    'faculty.delete',
    'departments.read',
    'departments.create',
    'departments.update',
    'attendance.read',
    'attendance.create',
    'attendance.update',
    'library.read',
    'library.create',
    'library.update',
    'results.read',
    'results.create',
    'results.update',
    'notifications.read',
    'notifications.create',
    'settings.read',
    'settings.update',
  ],
  principal: [
    'dashboard.read',
    'students.read',
    'faculty.read',
    'departments.read',
    'attendance.read',
    'library.read',
    'results.read',
    'notifications.read',
    'settings.read',
  ],
  hod: [
    'dashboard.read',
    'students.read',
    'faculty.read',
    'departments.read',
    'attendance.read',
    'attendance.update',
    'results.read',
    'notifications.read',
  ],
  professor: [
    'dashboard.read',
    'students.read',
    'attendance.read',
    'attendance.create',
    'attendance.update',
    'results.read',
    'results.create',
  ],
  student: [
    'dashboard.read',
    'attendance.read',
    'library.read',
    'results.read',
  ],
  cr: [
    'dashboard.read',
    'students.read',
    'attendance.read',
    'library.read',
    'results.read',
    'notifications.read',
  ],
  librarian: [
    'dashboard.read',
    'library.read',
    'library.create',
    'library.update',
    'notifications.read',
  ],
  staff: [
    'dashboard.read',
    'students.read',
    'faculty.read',
    'departments.read',
    'notifications.read',
  ],
};

export function getPermissionsForRoles(roles: readonly string[]): PermissionCode[] {
  const permissions = new Set<PermissionCode>();
  for (const role of roles) {
    const rolePerms = ROLE_PERMISSIONS_MAP[role as CmsRole];
    if (rolePerms) {
      for (const p of rolePerms) {
        permissions.add(p);
      }
    }
  }
  return Array.from(permissions);
}
