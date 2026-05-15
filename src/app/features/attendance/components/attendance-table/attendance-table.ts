import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import {
  type AttendanceRecord,
  type AttendanceRecordStatus,
  type AttendanceRecordStatusChange,
} from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-table',
  imports: [],
  templateUrl: './attendance-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceTable {
  readonly records = input.required<readonly AttendanceRecord[]>();
  readonly editable = input(false);
  readonly statusChange = output<AttendanceRecordStatusChange>();

  protected readonly statuses: readonly AttendanceRecordStatus[] = ['present', 'absent', 'late', 'excused'];

  protected onStatusChange(recordId: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.statusChange.emit({ recordId, status: selectElement.value as AttendanceRecordStatus });
  }

  protected statusLabel(status: AttendanceRecordStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  protected statusClass(status: AttendanceRecordStatus): string {
    if (status === 'present') {
      return 'bg-emerald-50 text-emerald-800';
    }

    if (status === 'absent') {
      return 'bg-rose-50 text-rose-800';
    }

    if (status === 'late') {
      return 'bg-amber-50 text-amber-900';
    }

    return 'bg-[#faf9f5] text-[#3d3d3a]';
  }
}
