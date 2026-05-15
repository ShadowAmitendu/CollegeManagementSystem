import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { type LibraryIssueStatusFilter, Library } from '../../services/library';

@Component({
  selector: 'app-book-issues',
  imports: [RouterLink],
  templateUrl: './book-issues.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BookIssues {
  private readonly permissions = inject(Permissions);
  private readonly route = inject(ActivatedRoute);
  protected readonly library = inject(Library);
  protected readonly canManageLibrary = computed(() => this.permissions.can('library.update'));
  protected readonly selectedBookId = this.route.snapshot.queryParamMap.get('bookId');
  protected readonly selectedBook = computed(() => (this.selectedBookId ? this.library.getBook(this.selectedBookId) : undefined));

  protected onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.library.setIssueStatus(select.value as LibraryIssueStatusFilter);
  }
}
