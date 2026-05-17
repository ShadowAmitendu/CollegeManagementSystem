import { Routes } from '@angular/router';

export const timetableRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/timetable-list/timetable-list').then((m) => m.TimetableList) },
];
