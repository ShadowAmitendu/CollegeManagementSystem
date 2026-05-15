import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword) },
  { path: 'reset-password', loadComponent: () => import('./pages/reset-password/reset-password').then((m) => m.ResetPassword) },
  { path: 'verify-account', loadComponent: () => import('./pages/verify-account/verify-account').then((m) => m.VerifyAccount) },
];
