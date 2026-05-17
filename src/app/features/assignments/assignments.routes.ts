import { Routes } from '@angular/router';

export const assignmentsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/assignments-list/assignments-list').then((m) => m.AssignmentsList) },
];
