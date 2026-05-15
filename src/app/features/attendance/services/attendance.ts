import { computed, Injectable, signal } from '@angular/core';

import { ATTENDANCE_RECORDS, ATTENDANCE_SESSIONS } from '../data/attendance-static-data';
import {
  type AttendanceRecord,
  type AttendanceRecordStatus,
  type AttendanceSession,
  type AttendanceSessionStatusFilter,
  type AttendanceSummary,
} from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class Attendance {
  private readonly sessionsSignal = signal<readonly AttendanceSession[]>(ATTENDANCE_SESSIONS);
  private readonly recordsSignal = signal<readonly AttendanceRecord[]>(ATTENDANCE_RECORDS);
  private readonly searchSignal = signal('');
  private readonly statusFilterSignal = signal<AttendanceSessionStatusFilter>('all');

  readonly sessions = this.sessionsSignal.asReadonly();
  readonly records = this.recordsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedStatus = this.statusFilterSignal.asReadonly();

  readonly filteredSessions = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const status = this.statusFilterSignal();

    return this.sessionsSignal().filter((session) => {
      const matchesStatus = status === 'all' || session.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          session.courseCode,
          session.courseTitle,
          session.facultyName,
          session.department,
          session.room,
          session.sessionDate,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const sessions = this.sessionsSignal();
    const records = this.recordsSignal();
    const submitted = sessions.filter((session) => session.status !== 'draft').length;
    const average =
      sessions.length === 0
        ? 0
        : Math.round(
            sessions.reduce((sum, session) => sum + this.getSummary(session.$id).percentage, 0) / sessions.length,
          );

    return [
      { label: 'Sessions', value: String(sessions.length) },
      { label: 'Submitted', value: String(submitted) },
      { label: 'Drafts', value: String(sessions.length - submitted) },
      { label: 'Records', value: String(records.length) },
      { label: 'Average', value: `${average}%` },
    ] as const;
  });

  readonly markableSessions = computed(() =>
    this.sessionsSignal().filter((session) => session.status === 'draft' || session.status === 'submitted'),
  );

  async loadSessions(): Promise<void> {
    return Promise.resolve();
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setStatusFilter(value: AttendanceSessionStatusFilter): void {
    this.statusFilterSignal.set(value);
  }

  getSession(sessionId: string): AttendanceSession | undefined {
    return this.sessionsSignal().find((session) => session.$id === sessionId);
  }

  getRecordsForSession(sessionId: string): readonly AttendanceRecord[] {
    return this.recordsSignal().filter((record) => record.attendanceSessionId === sessionId);
  }

  getSummary(sessionId: string): AttendanceSummary {
    const records = this.getRecordsForSession(sessionId);
    const present = records.filter((record) => record.status === 'present').length;
    const absent = records.filter((record) => record.status === 'absent').length;
    const late = records.filter((record) => record.status === 'late').length;
    const excused = records.filter((record) => record.status === 'excused').length;
    const attended = present + late + excused;

    return {
      total: records.length,
      present,
      absent,
      late,
      excused,
      percentage: records.length === 0 ? 0 : Math.round((attended / records.length) * 100),
    };
  }

  updateRecordStatus(recordId: string, status: AttendanceRecordStatus): void {
    this.recordsSignal.update((records) =>
      records.map((record) => (record.$id === recordId ? { ...record, status } : record)),
    );
  }

  submitSession(sessionId: string): void {
    this.sessionsSignal.update((sessions) =>
      sessions.map((session) => (session.$id === sessionId ? { ...session, status: 'submitted' } : session)),
    );
  }
}
