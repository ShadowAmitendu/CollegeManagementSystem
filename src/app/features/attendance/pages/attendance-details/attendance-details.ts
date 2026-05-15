import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { AttendanceTable } from '../../components/attendance-table/attendance-table';
import { Attendance } from '../../services/attendance';

@Component({
  selector: 'app-attendance-details',
  imports: [AttendanceTable, RouterLink],
  templateUrl: './attendance-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly attendance = inject(Attendance);
  private readonly permissions = inject(Permissions);

  protected readonly session = computed(() => this.attendance.getSession(this.route.snapshot.paramMap.get('id') ?? ''));
  protected readonly records = computed(() => {
    const session = this.session();
    return session ? this.attendance.getRecordsForSession(session.$id) : [];
  });
  protected readonly summary = computed(() => {
    const session = this.session();
    return session ? this.attendance.getSummary(session.$id) : undefined;
  });
  protected readonly canMarkAttendance = computed(() =>
    this.permissions.canAny(['attendance.create', 'attendance.update'] as const),
  );
}
