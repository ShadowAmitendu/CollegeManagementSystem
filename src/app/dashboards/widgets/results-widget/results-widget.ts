import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Results } from '../../../features/results/services/results';

@Component({
  selector: 'app-results-widget',
  imports: [RouterLink],
  templateUrl: './results-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResultsWidget {
  protected readonly results = inject(Results);
}
