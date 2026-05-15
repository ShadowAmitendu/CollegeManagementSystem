import { inject, Injectable, signal } from '@angular/core';

import { FacultyApi } from './faculty-api';
import { type FacultyMember } from '../models/faculty.model';

@Injectable({ providedIn: 'root' })
export class Faculty {
  private readonly api = inject(FacultyApi);
  private readonly rowsSignal = signal<readonly FacultyMember[]>([]);

  readonly rows = this.rowsSignal.asReadonly();

  async load(): Promise<void> {
    const response = await this.api.list();
    this.rowsSignal.set(response.rows);
  }
}
