import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type Result } from '../../models/result.model';

@Component({
  selector: 'app-result-card',
  imports: [],
  templateUrl: './result-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResultCard {
  readonly result = input.required<Result>();
  readonly canPublish = input(false);
  readonly viewResult = output<string>();
  readonly publishResult = output<string>();

  protected readonly percentage = computed(() => Math.round((this.result().marksObtained / this.result().maximumMarks) * 100));
  protected readonly statusClass = computed(() => {
    const status = this.result().status;

    if (status === 'locked') {
      return 'bg-[#181715] text-[#faf9f5]';
    }

    if (status === 'published') {
      return 'bg-emerald-50 text-emerald-800';
    }

    return 'bg-[#cc785c] text-white';
  });
}
