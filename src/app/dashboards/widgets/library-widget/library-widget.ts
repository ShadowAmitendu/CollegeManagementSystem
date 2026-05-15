import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Library } from '../../../features/library/services/library';

@Component({
  selector: 'app-library-widget',
  imports: [RouterLink],
  templateUrl: './library-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class LibraryWidget {
  protected readonly library = inject(Library);
}
