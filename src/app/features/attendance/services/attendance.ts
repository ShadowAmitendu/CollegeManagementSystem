import { inject, Injectable, signal } from '@angular/core';

import { AttendanceApi } from './attendance-api';
import { type AttendanceSession } from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class Attendance {
  private readonly api = inject(AttendanceApi);
  private readonly sessionsSignal = signal<readonly AttendanceSession[]>([]);

  readonly sessions = this.sessionsSignal.asReadonly();

  async loadSessions(): Promise<void> {
    const response = await this.api.listSessions();
    this.sessionsSignal.set(response.rows);
  }
}
