import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type Book } from '../../models/library.model';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly activeIssues = input(0);
  readonly viewBook = output<string>();
  readonly issueBook = output<string>();

  protected readonly availability = computed(() => {
    const book = this.book();

    if (book.availableCopies === 0) {
      return 'Unavailable';
    }

    if (book.availableCopies <= Math.max(1, Math.floor(book.totalCopies * 0.25))) {
      return 'Limited';
    }

    return 'Available';
  });
}
