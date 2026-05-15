import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', loadComponent: () => import('./pages/profile-settings/profile-settings').then((m) => m.ProfileSettings) },
  { path: 'security', loadComponent: () => import('./pages/security-settings/security-settings').then((m) => m.SecuritySettings) },
  { path: 'notifications', loadComponent: () => import('./pages/notification-settings/notification-settings').then((m) => m.NotificationSettings) },
  { path: 'system', loadComponent: () => import('./pages/system-settings/system-settings').then((m) => m.SystemSettings) },
];
