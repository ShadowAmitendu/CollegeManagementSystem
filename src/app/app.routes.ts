import { Routes } from '@angular/router';

import { authCanMatchGuard, authGuard } from './core/guards/auth-guard';
import { guestCanMatchGuard, guestGuard } from './core/guards/guest-guard';
import { permissionCanMatchGuard, permissionGuard } from './core/guards/permission-guard';
import { ROUTE_PERMISSIONS } from './core/utils/constants';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    canMatch: [guestCanMatchGuard],
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    canActivate: [authGuard],
    canMatch: [authCanMatchGuard],
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboards/pages/dashboard-home/dashboard-home').then((m) => m.DashboardHome),
      },
      {
        path: 'students',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.students },
        loadChildren: () =>
          import('./features/students/students.routes').then((m) => m.studentsRoutes),
      },
      {
        path: 'faculty',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.faculty },
        loadChildren: () =>
          import('./features/faculty/faculty.routes').then((m) => m.facultyRoutes),
      },
      {
        path: 'departments',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.departments },
        loadChildren: () =>
          import('./features/departments/departments.routes').then((m) => m.departmentsRoutes),
      },
      {
        path: 'programs',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.departments },
        loadChildren: () =>
          import('./features/programs/programs.routes').then((m) => m.programsRoutes),
      },
      {
        path: 'attendance',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.attendance },
        loadChildren: () =>
          import('./features/attendance/attendance.routes').then((m) => m.attendanceRoutes),
      },
      {
        path: 'library',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.library },
        loadChildren: () =>
          import('./features/library/library.routes').then((m) => m.libraryRoutes),
      },
      {
        path: 'results',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.results },
        loadChildren: () =>
          import('./features/results/results.routes').then((m) => m.resultsRoutes),
      },
      {
        path: 'notifications',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.notifications },
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(
            (m) => m.notificationsRoutes,
          ),
      },
      {
        path: 'designations',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.designations },
        loadChildren: () =>
          import('./features/designations/designations.routes').then((m) => m.designationsRoutes),
      },
      {
        path: 'assignments',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.assignments },
        loadChildren: () =>
          import('./features/assignments/assignments.routes').then((m) => m.assignmentsRoutes),
      },
      {
        path: 'examinations',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.examinations },
        loadChildren: () =>
          import('./features/examinations/examinations.routes').then((m) => m.examinationsRoutes),
      },
      {
        path: 'timetable',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.timetable },
        loadChildren: () =>
          import('./features/timetable/timetable.routes').then((m) => m.timetableRoutes),
      },
      {
        path: 'communication',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.communication },
        loadChildren: () =>
          import('./features/communication/communication.routes').then((m) => m.communicationRoutes),
      },
      {
        path: 'finance',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.finance },
        loadChildren: () =>
          import('./features/finance/finance.routes').then((m) => m.financeRoutes),
      },
      {
        path: 'operations',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.operations },
        loadChildren: () =>
          import('./features/operations/operations.routes').then((m) => m.operationsRoutes),
      },
      {
        path: 'analytics',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.analytics },
        loadChildren: () =>
          import('./features/analytics/analytics.routes').then((m) => m.analyticsRoutes),
      },
      {
        path: 'reports',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.reports },
        loadChildren: () =>
          import('./features/reports/reports.routes').then((m) => m.reportsRoutes),
      },
      {
        path: 'user-management',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.userManagement },
        loadChildren: () =>
          import('./features/user-management/user-management.routes').then((m) => m.userManagementRoutes),
      },
      {
        path: 'system',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.system },
        loadChildren: () =>
          import('./features/system/system.routes').then((m) => m.systemRoutes),
      },
      {
        path: 'account',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.account },
        loadChildren: () =>
          import('./features/account/account.routes').then((m) => m.accountRoutes),
      },
      {
        path: 'settings',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.settings },
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.settingsRoutes),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
