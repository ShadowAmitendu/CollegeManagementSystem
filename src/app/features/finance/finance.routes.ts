import { Routes } from '@angular/router';

export const financeRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/finance-list/finance-list').then((m) => m.FinanceList) },
];
