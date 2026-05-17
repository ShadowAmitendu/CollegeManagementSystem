import { Routes } from '@angular/router';

export const operationsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/operations-list/operations-list').then((m) => m.OperationsList) },
];
