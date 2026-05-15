import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import {
  type Book,
  type BookIssue,
  type CreateBookIssuePayload,
  type CreateBookPayload,
  type UpdateBookIssuePayload,
  type UpdateBookPayload,
} from '../models/library.model';

@Injectable({ providedIn: 'root' })
export class LibraryApi {
  private readonly database = inject(AppwriteDatabase);

  listBooks(queries: string[] = []) {
    return this.database.listRows<Book>(APPWRITE_CONFIG.tables.books, queries);
  }

  getBook(bookId: string) {
    return this.database.getRow<Book>(APPWRITE_CONFIG.tables.books, bookId);
  }

  createBook(payload: CreateBookPayload) {
    return this.database.createRow<Book>(APPWRITE_CONFIG.tables.books, payload);
  }

  updateBook(bookId: string, payload: UpdateBookPayload) {
    return this.database.updateRow<Book>(APPWRITE_CONFIG.tables.books, bookId, payload);
  }

  listIssues(queries: string[] = []) {
    return this.database.listRows<BookIssue>(APPWRITE_CONFIG.tables.bookIssues, queries);
  }

  createIssue(payload: CreateBookIssuePayload) {
    return this.database.createRow<BookIssue>(APPWRITE_CONFIG.tables.bookIssues, payload);
  }

  updateIssue(issueId: string, payload: UpdateBookIssuePayload) {
    return this.database.updateRow<BookIssue>(APPWRITE_CONFIG.tables.bookIssues, issueId, payload);
  }
}
