import { Routes } from '@angular/router';

export const departmentsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/department-list/department-list').then((m) => m.DepartmentList) },
  { path: ':id', loadComponent: () => import('./pages/department-details/department-details').then((m) => m.DepartmentDetails) },
];
