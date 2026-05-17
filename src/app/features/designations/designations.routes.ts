import { Routes } from '@angular/router';

export const designationsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/designations-list/designations-list').then((m) => m.DesignationsList) },
];
