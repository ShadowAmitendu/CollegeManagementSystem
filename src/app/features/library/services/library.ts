import { computed, Injectable, signal } from '@angular/core';

import { LIBRARY_BOOKS, LIBRARY_ISSUES } from '../data/library-static-data';
import { type Book, type BookIssue } from '../models/library.model';

export type LibraryAvailability = 'available' | 'limited' | 'unavailable';
export type LibraryIssueStatusFilter = 'all' | BookIssue['status'];

@Injectable({ providedIn: 'root' })
export class Library {
  private readonly booksSignal = signal<readonly Book[]>(LIBRARY_BOOKS);
  private readonly issuesSignal = signal<readonly BookIssue[]>(LIBRARY_ISSUES);
  private readonly searchSignal = signal('');
  private readonly categorySignal = signal('all');
  private readonly issueStatusSignal = signal<LibraryIssueStatusFilter>('all');

  readonly books = this.booksSignal.asReadonly();
  readonly issues = this.issuesSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedCategory = this.categorySignal.asReadonly();
  readonly selectedIssueStatus = this.issueStatusSignal.asReadonly();

  readonly categories = computed(() =>
    Array.from(new Set(this.booksSignal().map((book) => book.category))).sort((first, second) =>
      first.localeCompare(second),
    ),
  );

  readonly filteredBooks = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const category = this.categorySignal();

    return this.booksSignal().filter((book) => {
      const matchesCategory = category === 'all' || book.category === category;
      const matchesSearch =
        query.length === 0 ||
        [book.title, book.author, book.isbn, book.category, book.location].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesCategory && matchesSearch;
    });
  });

  readonly filteredIssues = computed(() => {
    const status = this.issueStatusSignal();

    if (status === 'all') {
      return this.issuesSignal();
    }

    return this.issuesSignal().filter((issue) => issue.status === status);
  });

  readonly activeIssues = computed(() => this.issuesSignal().filter((issue) => issue.status !== 'returned'));
  readonly overdueIssues = computed(() => this.issuesSignal().filter((issue) => issue.status === 'overdue'));

  readonly stats = computed(() => {
    const books = this.booksSignal();
    const totalCopies = books.reduce((sum, book) => sum + book.totalCopies, 0);
    const availableCopies = books.reduce((sum, book) => sum + book.availableCopies, 0);

    return [
      { label: 'Books', value: String(books.length) },
      { label: 'Available copies', value: String(availableCopies) },
      { label: 'Active issues', value: String(this.activeIssues().length) },
      { label: 'Overdue', value: String(this.overdueIssues().length) },
      { label: 'Total copies', value: String(totalCopies) },
    ] as const;
  });

  loadBooks(): Promise<void> {
    return Promise.resolve();
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setCategory(value: string): void {
    this.categorySignal.set(value);
  }

  setIssueStatus(value: LibraryIssueStatusFilter): void {
    this.issueStatusSignal.set(value);
  }

  getBook(bookId: string): Book | undefined {
    return this.booksSignal().find((book) => book.$id === bookId);
  }

  getIssuesForBook(bookId: string): readonly BookIssue[] {
    return this.issuesSignal().filter((issue) => issue.bookId === bookId);
  }

  getBookTitle(bookId: string): string {
    return this.getBook(bookId)?.title ?? 'Unknown book';
  }

  getIssueCount(bookId: string): number {
    return this.issuesSignal().filter((issue) => issue.bookId === bookId && issue.status !== 'returned').length;
  }

  getAvailability(book: Book): LibraryAvailability {
    if (book.availableCopies === 0) {
      return 'unavailable';
    }

    if (book.availableCopies <= Math.max(1, Math.floor(book.totalCopies * 0.25))) {
      return 'limited';
    }

    return 'available';
  }

  getAvailabilityLabel(book: Book): string {
    const status = this.getAvailability(book);

    if (status === 'unavailable') {
      return 'Unavailable';
    }

    if (status === 'limited') {
      return 'Limited';
    }

    return 'Available';
  }
}
