import { Routes } from '@angular/router';

export const communicationRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/communication-list/communication-list').then((m) => m.CommunicationList) },
];
