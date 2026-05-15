import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Library } from '../../services/library';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BookDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly library = inject(Library);

  protected readonly book = computed(() => this.library.getBook(this.route.snapshot.paramMap.get('id') ?? ''));
  protected readonly issues = computed(() => {
    const book = this.book();
    return book ? this.library.getIssuesForBook(book.$id) : [];
  });
}
