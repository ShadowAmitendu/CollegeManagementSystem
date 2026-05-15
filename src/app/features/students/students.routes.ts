import { Routes } from '@angular/router';

export const studentsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/student-list/student-list').then((m) => m.StudentList) },
  { path: 'create', loadComponent: () => import('./pages/student-create/student-create').then((m) => m.StudentCreate) },
  { path: ':id', loadComponent: () => import('./pages/student-details/student-details').then((m) => m.StudentDetails) },
  { path: ':id/edit', loadComponent: () => import('./pages/student-edit/student-edit').then((m) => m.StudentEdit) },
];
