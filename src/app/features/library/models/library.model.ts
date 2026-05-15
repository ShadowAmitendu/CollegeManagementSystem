import { type Models } from 'appwrite';

export interface Book extends Models.Row {
  readonly isbn: string;
  readonly title: string;
  readonly author: string;
  readonly category: string;
  readonly availableCopies: number;
  readonly totalCopies: number;
  readonly coverFileId?: string;
}

export interface BookIssue extends Models.Row {
  readonly bookId: string;
  readonly studentId: string;
  readonly issuedAt: string;
  readonly dueAt: string;
  readonly returnedAt?: string;
  readonly status: 'issued' | 'returned' | 'overdue';
}

export type CreateBookPayload = Omit<Book, keyof Models.Row>;
export type UpdateBookPayload = Partial<CreateBookPayload>;
export type CreateBookIssuePayload = Omit<BookIssue, keyof Models.Row>;
export type UpdateBookIssuePayload = Partial<CreateBookIssuePayload>;
