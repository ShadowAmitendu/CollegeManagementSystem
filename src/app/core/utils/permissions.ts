export type CmsRole =
  | 'super_admin'
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
  super_admin: [
    'dashboard.read',
    'students.read', 'students.create', 'students.update', 'students.delete', 'students.manage',
    'faculty.read', 'faculty.create', 'faculty.update', 'faculty.delete', 'faculty.manage',
    'departments.read', 'departments.create', 'departments.update', 'departments.delete', 'departments.manage',
    'attendance.read', 'attendance.create', 'attendance.update', 'attendance.delete', 'attendance.manage',
    'library.read', 'library.create', 'library.update', 'library.delete', 'library.manage',
    'results.read', 'results.create', 'results.update', 'results.delete', 'results.manage',
    'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete', 'notifications.manage',
    'settings.read', 'settings.update', 'settings.delete', 'settings.manage',
    'designations.read', 'designations.manage',
    'assignments.read', 'assignments.manage',
    'examinations.read', 'examinations.manage',
    'timetable.read', 'timetable.manage',
    'communication.read', 'communication.manage',
    'finance.read', 'finance.manage',
    'operations.read', 'operations.manage',
    'analytics.read', 'analytics.manage',
    'reports.read', 'reports.manage',
    'userManagement.read', 'userManagement.manage',
    'system.read', 'system.manage',
    'account.read', 'account.manage'
  ],
  admin: [
    'dashboard.read',
    'students.read', 'students.create', 'students.update', 'students.delete', 'students.manage',
    'faculty.read', 'faculty.create', 'faculty.update', 'faculty.delete', 'faculty.manage',
    'departments.read', 'departments.create', 'departments.update', 'departments.delete', 'departments.manage',
    'attendance.read', 'attendance.create', 'attendance.update', 'attendance.delete', 'attendance.manage',
    'library.read', 'library.create', 'library.update', 'library.delete', 'library.manage',
    'results.read', 'results.create', 'results.update', 'results.delete', 'results.manage',
    'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete', 'notifications.manage',
    'settings.read', 'settings.update', 'settings.delete', 'settings.manage',
    'designations.read', 'designations.manage',
    'assignments.read', 'assignments.manage',
    'examinations.read', 'examinations.manage',
    'timetable.read', 'timetable.manage',
    'communication.read', 'communication.manage',
    'finance.read', 'finance.manage',
    'operations.read', 'operations.manage',
    'analytics.read', 'analytics.manage',
    'reports.read', 'reports.manage',
    'userManagement.read', 'userManagement.manage',
    'system.read', 'system.manage',
    'account.read', 'account.manage'
  ],
  principal: [
    'dashboard.read',
    'students.read', 'students.manage',
    'faculty.read', 'faculty.manage',
    'departments.read', 'departments.manage',
    'designations.read', 'designations.manage',
    'attendance.read', 'attendance.manage',
    'assignments.read', 'assignments.manage',
    'results.read', 'results.manage',
    'examinations.read', 'examinations.manage',
    'timetable.read', 'timetable.manage',
    'communication.read', 'communication.manage',
    'library.read', 'library.manage',
    'finance.read', 'finance.manage',
    'operations.read', 'operations.manage',
    'analytics.read', 'analytics.manage',
    'reports.read', 'reports.manage',
    'userManagement.read', 'userManagement.manage',
    'account.read', 'account.manage',
    'notifications.read', 'settings.read',
  ],
  hod: [
    'dashboard.read',
    'students.read', 'students.update',
    'faculty.read',
    'departments.read',
    'attendance.read', 'attendance.update',
    'assignments.read', 'assignments.update',
    'results.read',
    'examinations.read',
    'timetable.read',
    'communication.read',
    'library.read',
    'analytics.read',
    'reports.read',
    'operations.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
  ],
  professor: [
    'dashboard.read',
    'students.read',
    'attendance.read', 'attendance.create', 'attendance.update',
    'assignments.read', 'assignments.create', 'assignments.update',
    'results.read', 'results.create',
    'examinations.read',
    'timetable.read',
    'communication.read',
    'library.read',
    'analytics.read',
    'reports.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
  ],
  student: [
    'dashboard.read',
    'attendance.read',
    'assignments.read',
    'results.read',
    'timetable.read',
    'communication.read',
    'library.read',
    'finance.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
  ],
  cr: [
    'dashboard.read',
    'students.read',
    'attendance.read', 'attendance.create',
    'assignments.read',
    'results.read',
    'timetable.read',
    'communication.read',
    'library.read',
    'finance.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
  ],
  librarian: [
    'dashboard.read',
    'library.read', 'library.create', 'library.update', 'library.manage',
    'communication.read',
    'reports.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
  ],
  staff: [
    'dashboard.read',
    'students.read',
    'faculty.read',
    'departments.read',
    'operations.read', 'operations.update',
    'communication.read',
    'reports.read',
    'account.read', 'account.update',
    'notifications.read', 'settings.read',
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
