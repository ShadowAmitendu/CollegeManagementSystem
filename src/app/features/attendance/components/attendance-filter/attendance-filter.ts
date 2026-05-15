import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type AttendanceSessionStatusFilter } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-filter',
  imports: [],
  templateUrl: './attendance-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceFilter {
  readonly search = input('');
  readonly selectedStatus = input<AttendanceSessionStatusFilter>('all');
  readonly searchChange = output<string>();
  readonly statusChange = output<AttendanceSessionStatusFilter>();

  protected onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchChange.emit(inputElement.value);
  }

  protected onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.statusChange.emit(selectElement.value as AttendanceSessionStatusFilter);
  }
}
