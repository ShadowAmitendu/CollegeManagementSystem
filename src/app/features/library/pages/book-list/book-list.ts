import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { BookCard } from '../../components/book-card/book-card';
import { BookTable } from '../../components/book-table/book-table';
import { Library } from '../../services/library';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, BookTable, RouterLink],
  templateUrl: './book-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BookList {
  protected readonly library = inject(Library);
  private readonly permissions = inject(Permissions);
  protected readonly canManageLibrary = computed(() => this.permissions.can('library.update'));
  private readonly router = inject(Router);

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.library.setSearch(input.value);
  }

  protected onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.library.setCategory(select.value);
  }

  protected openBook(bookId: string): void {
    void this.router.navigate(['/library/books', bookId]);
  }

  protected openIssueFlow(bookId: string): void {
    void this.router.navigate(['/library/issues'], { queryParams: { bookId } });
  }
}
