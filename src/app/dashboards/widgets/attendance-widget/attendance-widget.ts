import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Attendance } from '../../../features/attendance/services/attendance';

@Component({
  selector: 'app-attendance-widget',
  imports: [RouterLink],
  templateUrl: './attendance-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceWidget {
  protected readonly attendance = inject(Attendance);
}
