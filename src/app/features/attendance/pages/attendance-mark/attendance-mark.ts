import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { AttendanceTable } from '../../components/attendance-table/attendance-table';
import { type AttendanceRecordStatusChange } from '../../models/attendance.model';
import { Attendance } from '../../services/attendance';

@Component({
  selector: 'app-attendance-mark',
  imports: [AttendanceTable, RouterLink],
  templateUrl: './attendance-mark.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AttendanceMark {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly permissions = inject(Permissions);
  protected readonly attendance = inject(Attendance);
  private readonly selectedSessionIdSignal = signal(this.initialSessionId());

  protected readonly selectedSessionId = this.selectedSessionIdSignal.asReadonly();
  protected readonly canUpdateAttendance = computed(() =>
    this.permissions.canAny(['attendance.create', 'attendance.update'] as const),
  );
  protected readonly session = computed(() => this.attendance.getSession(this.selectedSessionId()));
  protected readonly records = computed(() => {
    const session = this.session();
    return session ? this.attendance.getRecordsForSession(session.$id) : [];
  });
  protected readonly summary = computed(() => {
    const session = this.session();
    return session ? this.attendance.getSummary(session.$id) : undefined;
  });
  protected readonly canEditSession = computed(() => {
    const session = this.session();
    return this.canUpdateAttendance() && !!session && session.status !== 'locked';
  });

  protected onSessionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSessionIdSignal.set(selectElement.value);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sessionId: selectElement.value },
      queryParamsHandling: 'merge',
    });
  }

  protected onStatusChange(change: AttendanceRecordStatusChange): void {
    if (!this.canEditSession()) {
      return;
    }

    this.attendance.updateRecordStatus(change.recordId, change.status);
  }

  protected submitSession(): void {
    const session = this.session();

    if (!session || !this.canEditSession()) {
      return;
    }

    this.attendance.submitSession(session.$id);
    void this.router.navigate(['/attendance', session.$id]);
  }

  private initialSessionId(): string {
    return (
      this.route.snapshot.queryParamMap.get('sessionId') ??
      this.attendance.markableSessions()[0]?.$id ??
      this.attendance.sessions()[0]?.$id ??
      ''
    );
  }
}
