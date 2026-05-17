import { Routes } from '@angular/router';

export const analyticsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/analytics-list/analytics-list').then((m) => m.AnalyticsList) },
];
