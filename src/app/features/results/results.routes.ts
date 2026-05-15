import { Routes } from '@angular/router';

export const resultsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/results-list/results-list').then((m) => m.ResultsList) },
  { path: ':id', loadComponent: () => import('./pages/result-details/result-details').then((m) => m.ResultDetails) },
];
