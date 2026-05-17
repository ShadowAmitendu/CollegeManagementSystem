import { Routes } from '@angular/router';

export const userManagementRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/user-management-list/user-management-list').then((m) => m.UserManagementList) },
];
