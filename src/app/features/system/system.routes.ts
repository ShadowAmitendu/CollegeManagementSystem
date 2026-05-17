import { Routes } from '@angular/router';

export const systemRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/system-list/system-list').then((m) => m.SystemList) },
];
