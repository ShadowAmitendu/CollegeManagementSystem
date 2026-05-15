import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type Result } from '../../models/result.model';

@Component({
  selector: 'app-results-table',
  imports: [],
  templateUrl: './results-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResultsTable {
  readonly results = input.required<readonly Result[]>();
  readonly canPublish = input(false);
  readonly viewResult = output<string>();
  readonly publishResult = output<string>();

  protected percentage(result: Result): number {
    return Math.round((result.marksObtained / result.maximumMarks) * 100);
  }
}
