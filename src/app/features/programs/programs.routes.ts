import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/program-list/program-list').then((m) => m.ProgramList) },
];
