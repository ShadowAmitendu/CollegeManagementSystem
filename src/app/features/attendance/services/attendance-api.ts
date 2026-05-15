import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import {
  type AttendanceRecord,
  type AttendanceSession,
  type CreateAttendanceRecordPayload,
  type CreateAttendanceSessionPayload,
  type UpdateAttendanceRecordPayload,
  type UpdateAttendanceSessionPayload,
} from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceApi {
  private readonly database = inject(AppwriteDatabase);

  listSessions(queries: string[] = []) {
    return this.database.listRows<AttendanceSession>(APPWRITE_CONFIG.tables.attendanceSessions, queries);
  }

  createSession(payload: CreateAttendanceSessionPayload) {
    return this.database.createRow<AttendanceSession>(APPWRITE_CONFIG.tables.attendanceSessions, payload);
  }

  updateSession(sessionId: string, payload: UpdateAttendanceSessionPayload) {
    return this.database.updateRow<AttendanceSession>(APPWRITE_CONFIG.tables.attendanceSessions, sessionId, payload);
  }

  listRecords(queries: string[] = []) {
    return this.database.listRows<AttendanceRecord>(APPWRITE_CONFIG.tables.attendanceRecords, queries);
  }

  createRecord(payload: CreateAttendanceRecordPayload) {
    return this.database.createRow<AttendanceRecord>(APPWRITE_CONFIG.tables.attendanceRecords, payload);
  }

  updateRecord(recordId: string, payload: UpdateAttendanceRecordPayload) {
    return this.database.updateRow<AttendanceRecord>(APPWRITE_CONFIG.tables.attendanceRecords, recordId, payload);
  }
}
