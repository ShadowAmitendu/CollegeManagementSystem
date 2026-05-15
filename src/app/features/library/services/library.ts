import { inject, Injectable, signal } from '@angular/core';

import { LibraryApi } from './library-api';
import { type Book } from '../models/library.model';

@Injectable({ providedIn: 'root' })
export class Library {
  private readonly api = inject(LibraryApi);
  private readonly booksSignal = signal<readonly Book[]>([]);

  readonly books = this.booksSignal.asReadonly();

  async loadBooks(): Promise<void> {
    const response = await this.api.listBooks();
    this.booksSignal.set(response.rows);
  }
}
