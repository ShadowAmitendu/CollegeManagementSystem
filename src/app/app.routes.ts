import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./dashboards/pages/dashboard-home/dashboard-home').then((m) => m.DashboardHome) },
      { path: 'students', loadChildren: () => import('./features/students/students.routes').then((m) => m.studentsRoutes) },
      { path: 'faculty', loadChildren: () => import('./features/faculty/faculty.routes').then((m) => m.facultyRoutes) },
      { path: 'departments', loadChildren: () => import('./features/departments/departments.routes').then((m) => m.departmentsRoutes) },
      { path: 'attendance', loadChildren: () => import('./features/attendance/attendance.routes').then((m) => m.attendanceRoutes) },
      { path: 'library', loadChildren: () => import('./features/library/library.routes').then((m) => m.libraryRoutes) },
      { path: 'results', loadChildren: () => import('./features/results/results.routes').then((m) => m.resultsRoutes) },
      { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.routes').then((m) => m.notificationsRoutes) },
      { path: 'settings', loadChildren: () => import('./features/settings/settings.routes').then((m) => m.settingsRoutes) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
