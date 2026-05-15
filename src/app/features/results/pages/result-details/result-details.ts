import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Results } from '../../services/results';

@Component({
  selector: 'app-result-details',
  imports: [RouterLink],
  templateUrl: './result-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResultDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly results = inject(Results);
  protected readonly result = computed(() => this.results.getResult(this.route.snapshot.paramMap.get('id') ?? ''));
  protected readonly percentage = computed(() => {
    const result = this.result();
    return result ? this.results.getPercentage(result) : 0;
  });
}
