import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { AttendanceFilter } from '../../components/attendance-filter/attendance-filter';
import { AttendanceSummaryCard } from '../../components/attendance-summary-card/attendance-summary-card';
import { type AttendanceSessionStatusFilter } from '../../models/attendance.model';
import { Attendance } from '../../services/attendance';

@Component({
  selector: 'app-attendance-list',
  imports: [AttendanceFilter, AttendanceSummaryCard, RouterLink],
  templateUrl: './attendance-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceList {
  protected readonly attendance = inject(Attendance);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);

  protected readonly canMarkAttendance = computed(() =>
    this.permissions.canAny(['attendance.create', 'attendance.update'] as const),
  );

  protected onSearch(value: string): void {
    this.attendance.setSearch(value);
  }

  protected onStatusChange(value: AttendanceSessionStatusFilter): void {
    this.attendance.setStatusFilter(value);
  }

  protected openSession(sessionId: string): void {
    void this.router.navigate(['/attendance', sessionId]);
  }

  protected openMarking(sessionId?: string): void {
    void this.router.navigate(['/attendance/mark'], {
      queryParams: sessionId ? { sessionId } : undefined,
    });
  }
}
