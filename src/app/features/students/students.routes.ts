import { Routes } from '@angular/router';

export const studentsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/student-list/student-list').then((m) => m.StudentList) },
  { path: 'create', loadComponent: () => import('./pages/student-create/student-create').then((m) => m.StudentCreate) },
  { path: 'import', loadComponent: () => import('./pages/import-students/import-students').then((m) => m.ImportStudents) },
  { path: 'analytics', loadComponent: () => import('./pages/student-analytics/student-analytics').then((m) => m.StudentAnalytics) },
  { path: 'defaulters', loadComponent: () => import('./pages/defaulters/defaulters').then((m) => m.Defaulters) },
  { path: 'attendance-summary', loadComponent: () => import('./pages/attendance-summary/attendance-summary').then((m) => m.AttendanceSummary) },
  { path: 'fee-due', loadComponent: () => import('./pages/fee-due-students/fee-due-students').then((m) => m.FeeDueStudents) },
  { path: 'graduated', loadComponent: () => import('./pages/graduated-students/graduated-students').then((m) => m.GraduatedStudents) },
  { path: 'suspended', loadComponent: () => import('./pages/suspended-students/suspended-students').then((m) => m.SuspendedStudents) },
  { path: 'alumni', loadComponent: () => import('./pages/alumni/alumni').then((m) => m.Alumni) },
  { path: 'cr-management', loadComponent: () => import('./pages/cr-management/cr-management').then((m) => m.CrManagement) },
  { path: 'reports', loadComponent: () => import('./pages/student-reports/student-reports').then((m) => m.StudentReports) },
  { path: ':id', loadComponent: () => import('./pages/student-details/student-details').then((m) => m.StudentDetails) },
  { path: ':id/edit', loadComponent: () => import('./pages/student-edit/student-edit').then((m) => m.StudentEdit) },
];
