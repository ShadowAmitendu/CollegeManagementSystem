import { type Models } from 'appwrite';

export interface AttendanceSession extends Models.Row {
  readonly courseOfferingId: string;
  readonly takenByFacultyId: string;
  readonly sessionDate: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly status: 'draft' | 'submitted' | 'locked';
}

export interface AttendanceRecord extends Models.Row {
  readonly attendanceSessionId: string;
  readonly studentId: string;
  readonly status: 'present' | 'absent' | 'late' | 'excused';
  readonly remarks?: string;
}

export type CreateAttendanceSessionPayload = Omit<AttendanceSession, keyof Models.Row>;
export type UpdateAttendanceSessionPayload = Partial<CreateAttendanceSessionPayload>;
export type CreateAttendanceRecordPayload = Omit<AttendanceRecord, keyof Models.Row>;
export type UpdateAttendanceRecordPayload = Partial<CreateAttendanceRecordPayload>;
