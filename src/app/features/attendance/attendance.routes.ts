import { Routes } from '@angular/router';

export const attendanceRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/attendance-list/attendance-list').then((m) => m.AttendanceList) },
  { path: 'mark', loadComponent: () => import('./pages/attendance-mark/attendance-mark').then((m) => m.AttendanceMark) },
  { path: ':id', loadComponent: () => import('./pages/attendance-details/attendance-details').then((m) => m.AttendanceDetails) },
];
