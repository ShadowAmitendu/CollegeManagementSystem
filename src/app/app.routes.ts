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
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboards/pages/dashboard-home/dashboard-home').then((m) => m.DashboardHome),
      },
      {
        path: 'students',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.students },
        loadChildren: () => import('./features/students/students.routes').then((m) => m.studentsRoutes),
      },
      {
        path: 'faculty',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.faculty },
        loadChildren: () => import('./features/faculty/faculty.routes').then((m) => m.facultyRoutes),
      },
      {
        path: 'departments',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.departments },
        loadChildren: () => import('./features/departments/departments.routes').then((m) => m.departmentsRoutes),
      },
      {
        path: 'attendance',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.attendance },
        loadChildren: () => import('./features/attendance/attendance.routes').then((m) => m.attendanceRoutes),
      },
      {
        path: 'library',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.library },
        loadChildren: () => import('./features/library/library.routes').then((m) => m.libraryRoutes),
      },
      {
        path: 'results',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.results },
        loadChildren: () => import('./features/results/results.routes').then((m) => m.resultsRoutes),
      },
      {
        path: 'notifications',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.notifications },
        loadChildren: () => import('./features/notifications/notifications.routes').then((m) => m.notificationsRoutes),
      },
      {
        path: 'settings',
        canActivate: [permissionGuard],
        canMatch: [permissionCanMatchGuard],
        data: { permission: ROUTE_PERMISSIONS.settings },
        loadChildren: () => import('./features/settings/settings.routes').then((m) => m.settingsRoutes),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
