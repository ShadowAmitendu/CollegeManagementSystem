import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type Book } from '../../models/library.model';

@Component({
  selector: 'app-book-table',
  imports: [],
  templateUrl: './book-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block overflow-hidden rounded-xl border border-[#e6dfd8]' },
})
export class BookTable {
  readonly books = input.required<readonly Book[]>();
  readonly viewBook = output<string>();
  readonly issueBook = output<string>();
}
