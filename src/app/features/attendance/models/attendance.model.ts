import { type Models } from 'appwrite';

export type AttendanceSessionStatus = 'draft' | 'submitted' | 'locked';
export type AttendanceRecordStatus = 'present' | 'absent' | 'late' | 'excused';
export type AttendanceSessionStatusFilter = 'all' | AttendanceSessionStatus;

export interface AttendanceSession extends Models.Row {
  readonly courseOfferingId: string;
  readonly courseCode: string;
  readonly courseTitle: string;
  readonly takenByFacultyId: string;
  readonly facultyName: string;
  readonly department: string;
  readonly semester: number;
  readonly room: string;
  readonly sessionDate: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly status: AttendanceSessionStatus;
}

export interface AttendanceRecord extends Models.Row {
  readonly attendanceSessionId: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly rollNumber: string;
  readonly status: AttendanceRecordStatus;
  readonly remarks?: string;
}

export interface AttendanceSummary {
  readonly total: number;
  readonly present: number;
  readonly absent: number;
  readonly late: number;
  readonly excused: number;
  readonly percentage: number;
}

export interface AttendanceRecordStatusChange {
  readonly recordId: string;
  readonly status: AttendanceRecordStatus;
}

export type CreateAttendanceSessionPayload = Omit<AttendanceSession, keyof Models.Row>;
export type UpdateAttendanceSessionPayload = Partial<CreateAttendanceSessionPayload>;
export type CreateAttendanceRecordPayload = Omit<AttendanceRecord, keyof Models.Row>;
export type UpdateAttendanceRecordPayload = Partial<CreateAttendanceRecordPayload>;
