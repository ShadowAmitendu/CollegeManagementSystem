import { Routes } from '@angular/router';

export const libraryRoutes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadComponent: () => import('./pages/book-list/book-list').then((m) => m.BookList) },
  { path: 'books/:id', loadComponent: () => import('./pages/book-details/book-details').then((m) => m.BookDetails) },
  { path: 'issues', loadComponent: () => import('./pages/book-issues/book-issues').then((m) => m.BookIssues) },
];
