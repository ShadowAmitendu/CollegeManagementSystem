import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/account-list/account-list').then((m) => m.AccountList) },
];
