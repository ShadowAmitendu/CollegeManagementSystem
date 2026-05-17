import { Routes } from '@angular/router';

export const examinationsRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/examinations-list/examinations-list').then((m) => m.ExaminationsList) },
];
