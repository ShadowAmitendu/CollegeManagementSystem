import { ROUTE_PERMISSIONS } from '../../core/utils/constants';
import { type PermissionCode } from '../../core/utils/permissions';

export interface DashboardSubNavItem {
  readonly label: string;
  readonly path: string;
  readonly permission?: PermissionCode;
  readonly activeStartsWith?: readonly string[];
  readonly activeExact?: readonly string[];
  readonly inactiveStartsWith?: readonly string[];
}

export interface DashboardNavItem {
  readonly label: string;
  readonly path: string;
  readonly sectionPath: string;
  readonly permission?: PermissionCode;
  readonly children?: readonly DashboardSubNavItem[];
}

export const DASHBOARD_NAV_ITEMS: readonly DashboardNavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    sectionPath: '/dashboard',
  },
  {
    label: 'Students',
    path: '/students',
    sectionPath: '/students',
    permission: ROUTE_PERMISSIONS.students,
    children: [
      {
        label: 'Directory',
        path: '/students',
        activeStartsWith: ['/students'],
        inactiveStartsWith: ['/students/create'],
      },
      {
        label: 'Add Student',
        path: '/students/create',
        permission: 'students.create',
        activeStartsWith: ['/students/create'],
      },
    ],
  },
  {
    label: 'Faculty',
    path: '/faculty',
    sectionPath: '/faculty',
    permission: ROUTE_PERMISSIONS.faculty,
    children: [
      {
        label: 'Directory',
        path: '/faculty',
        activeStartsWith: ['/faculty'],
        inactiveStartsWith: ['/faculty/create'],
      },
      {
        label: 'Add Faculty',
        path: '/faculty/create',
        permission: 'faculty.create',
        activeStartsWith: ['/faculty/create'],
      },
    ],
  },
  {
    label: 'Departments',
    path: '/departments',
    sectionPath: '/departments',
    permission: ROUTE_PERMISSIONS.departments,
  },
  {
    label: 'Attendance',
    path: '/attendance',
    sectionPath: '/attendance',
    permission: ROUTE_PERMISSIONS.attendance,
    children: [
      {
        label: 'Sessions',
        path: '/attendance',
        activeExact: ['/attendance'],
      },
      {
        label: 'Mark Records',
        path: '/attendance/mark',
        permission: 'attendance.update',
        activeStartsWith: ['/attendance/mark'],
      },
    ],
  },
  {
    label: 'Library',
    path: '/library',
    sectionPath: '/library',
    permission: ROUTE_PERMISSIONS.library,
    children: [
      {
        label: 'Books',
        path: '/library/books',
        activeStartsWith: ['/library/books'],
      },
      {
        label: 'Issue Register',
        path: '/library/issues',
        permission: 'library.update',
        activeStartsWith: ['/library/issues'],
      },
    ],
  },
  {
    label: 'Results',
    path: '/results',
    sectionPath: '/results',
    permission: ROUTE_PERMISSIONS.results,
  },
  {
    label: 'Notifications',
    path: '/notifications',
    sectionPath: '/notifications',
    permission: ROUTE_PERMISSIONS.notifications,
  },
  {
    label: 'Settings',
    path: '/settings',
    sectionPath: '/settings',
    permission: ROUTE_PERMISSIONS.settings,
    children: [
      {
        label: 'Profile',
        path: '/settings/profile',
        activeStartsWith: ['/settings/profile'],
      },
      {
        label: 'Security',
        path: '/settings/security',
        permission: 'settings.update',
        activeStartsWith: ['/settings/security'],
      },
      {
        label: 'Notifications',
        path: '/settings/notifications',
        activeStartsWith: ['/settings/notifications'],
      },
      {
        label: 'System',
        path: '/settings/system',
        permission: 'settings.update',
        activeStartsWith: ['/settings/system'],
      },
    ],
  },
] as const;
