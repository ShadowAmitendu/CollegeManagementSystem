import { type CmsRole, type PermissionCode, type RbacPrincipal } from '../utils/permissions';

export interface StaticUser extends RbacPrincipal {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly department?: string;
}

const allPermissions = [
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
] as const satisfies readonly PermissionCode[];

const principalPermissions = [
  'dashboard.read',
  'students.read',
  'faculty.read',
  'departments.read',
  'attendance.read',
  'library.read',
  'results.read',
  'notifications.read',
  'settings.read',
] as const satisfies readonly PermissionCode[];

const hodPermissions = [
  'dashboard.read',
  'students.read',
  'faculty.read',
  'departments.read',
  'attendance.read',
  'attendance.update',
  'results.read',
  'notifications.read',
] as const satisfies readonly PermissionCode[];

const professorPermissions = [
  'dashboard.read',
  'students.read',
  'attendance.read',
  'attendance.create',
  'attendance.update',
  'results.read',
  'results.create',
] as const satisfies readonly PermissionCode[];

const studentPermissions = [
  'dashboard.read',
  'attendance.read',
  'library.read',
  'results.read',
] as const satisfies readonly PermissionCode[];

const crPermissions = [
  'dashboard.read',
  'students.read',
  'attendance.read',
  'library.read',
  'results.read',
  'notifications.read',
] as const satisfies readonly PermissionCode[];

const librarianPermissions = [
  'dashboard.read',
  'library.read',
  'library.create',
  'library.update',
  'notifications.read',
] as const satisfies readonly PermissionCode[];

const staffPermissions = [
  'dashboard.read',
  'students.read',
  'faculty.read',
  'departments.read',
  'notifications.read',
] as const satisfies readonly PermissionCode[];

export const STATIC_USERS: readonly StaticUser[] = [
  createStaticUser('dev-admin', 'Admin User', 'admin', allPermissions, 'Administration'),
  createStaticUser('dev-principal', 'Principal User', 'principal', principalPermissions, 'Administration'),
  createStaticUser('dev-hod', 'HOD User', 'hod', hodPermissions, 'Computer Science'),
  createStaticUser('dev-professor', 'Professor User', 'professor', professorPermissions, 'Computer Science'),
  createStaticUser('dev-student', 'Student User', 'student', studentPermissions, 'Computer Science'),
  createStaticUser('dev-cr', 'Class Representative', 'cr', crPermissions, 'Computer Science'),
  createStaticUser('dev-librarian', 'Librarian User', 'librarian', librarianPermissions, 'Library'),
  createStaticUser('dev-staff', 'Staff User', 'staff', staffPermissions, 'Office'),
];

export function findStaticUserByEmail(email: string): StaticUser | undefined {
  return STATIC_USERS.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
}

function createStaticUser(
  userId: string,
  name: string,
  role: CmsRole,
  permissions: readonly PermissionCode[],
  department: string,
): StaticUser {
  return {
    userId,
    name,
    roles: [role],
    permissions,
    email: `${role}@cms.dev`,
    password: 'password123',
    department,
  };
}
