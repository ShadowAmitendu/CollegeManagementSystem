import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type AttendanceSession, type AttendanceSummary } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-summary-card',
  imports: [],
  templateUrl: './attendance-summary-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceSummaryCard {
  readonly session = input.required<AttendanceSession>();
  readonly summary = input.required<AttendanceSummary>();
  readonly canMark = input(false);
  readonly viewSession = output<string>();
  readonly markSession = output<string>();

  protected readonly statusLabel = computed(() => {
    const status = this.session().status;
    return status.charAt(0).toUpperCase() + status.slice(1);
  });

  protected readonly statusClass = computed(() => {
    const status = this.session().status;

    if (status === 'locked') {
      return 'bg-[#181715] text-[#faf9f5]';
    }

    if (status === 'submitted') {
      return 'bg-[#faf9f5] text-[#141413]';
    }

    return 'bg-[#cc785c] text-white';
  });
}
