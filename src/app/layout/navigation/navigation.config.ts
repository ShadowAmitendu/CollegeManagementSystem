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
        label: 'Students',
        path: '/students',
        activeStartsWith: ['/students'],
        inactiveStartsWith: [
          '/students/analytics',
          '/students/attendance-summary',
          '/students/defaulters',
          '/students/fee-due',
          '/students/graduated',
          '/students/cr-management',
          '/students/reports',
        ],
      },
      {
        label: 'Analytics',
        path: '/students/analytics',
        activeStartsWith: ['/students/analytics'],
      },
      {
        label: 'Attendance',
        path: '/students/attendance-summary',
        activeStartsWith: ['/students/attendance-summary'],
      },
      {
        label: 'Defaulters',
        path: '/students/defaulters',
        activeStartsWith: ['/students/defaulters'],
      },
      {
        label: 'Fee Dues',
        path: '/students/fee-due',
        activeStartsWith: ['/students/fee-due'],
      },
      {
        label: 'Alumni',
        path: '/students/graduated',
        activeStartsWith: ['/students/graduated'],
      },
      {
        label: 'CRs',
        path: '/students/cr-management',
        activeStartsWith: ['/students/cr-management'],
      },
      {
        label: 'Reports',
        path: '/students/reports',
        activeStartsWith: ['/students/reports'],
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
    label: 'Designations',
    path: '/designations',
    sectionPath: '/designations',
    permission: ROUTE_PERMISSIONS.designations,
  },
  {
    label: 'Programs',
    path: '/programs',
    sectionPath: '/programs',
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
    label: 'Assignments',
    path: '/assignments',
    sectionPath: '/assignments',
    permission: ROUTE_PERMISSIONS.assignments,
  },
  {
    label: 'Results',
    path: '/results',
    sectionPath: '/results',
    permission: ROUTE_PERMISSIONS.results,
  },
  {
    label: 'Examinations',
    path: '/examinations',
    sectionPath: '/examinations',
    permission: ROUTE_PERMISSIONS.examinations,
  },
  {
    label: 'Timetable',
    path: '/timetable',
    sectionPath: '/timetable',
    permission: ROUTE_PERMISSIONS.timetable,
  },
  {
    label: 'Communication',
    path: '/communication',
    sectionPath: '/communication',
    permission: ROUTE_PERMISSIONS.communication,
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
    label: 'Finance',
    path: '/finance',
    sectionPath: '/finance',
    permission: ROUTE_PERMISSIONS.finance,
  },
  {
    label: 'Operations',
    path: '/operations',
    sectionPath: '/operations',
    permission: ROUTE_PERMISSIONS.operations,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    sectionPath: '/analytics',
    permission: ROUTE_PERMISSIONS.analytics,
  },
  {
    label: 'Reports',
    path: '/reports',
    sectionPath: '/reports',
    permission: ROUTE_PERMISSIONS.reports,
  },
  {
    label: 'User Management',
    path: '/user-management',
    sectionPath: '/user-management',
    permission: ROUTE_PERMISSIONS.userManagement,
  },
  {
    label: 'System',
    path: '/system',
    sectionPath: '/system',
    permission: ROUTE_PERMISSIONS.system,
  },
  {
    label: 'Account',
    path: '/account',
    sectionPath: '/account',
    permission: ROUTE_PERMISSIONS.account,
  },
] as const;
