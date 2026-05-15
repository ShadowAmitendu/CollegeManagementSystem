import { Routes } from '@angular/router';

export const facultyRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/faculty-list/faculty-list').then((m) => m.FacultyList) },
  { path: 'create', loadComponent: () => import('./pages/faculty-create/faculty-create').then((m) => m.FacultyCreate) },
  { path: ':id', loadComponent: () => import('./pages/faculty-details/faculty-details').then((m) => m.FacultyDetails) },
  { path: ':id/edit', loadComponent: () => import('./pages/faculty-edit/faculty-edit').then((m) => m.FacultyEdit) },
];
