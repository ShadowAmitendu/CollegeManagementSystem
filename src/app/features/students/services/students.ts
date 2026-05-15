import { inject, Injectable, signal } from '@angular/core';

import { StudentApi } from './student-api';
import { type Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private readonly api = inject(StudentApi);
  private readonly rowsSignal = signal<readonly Student[]>([]);
  private readonly loadingSignal = signal(false);

  readonly rows = this.rowsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  async load(): Promise<void> {
    this.loadingSignal.set(true);

    try {
      const response = await this.api.list();
      this.rowsSignal.set(response.rows);
    } finally {
      this.loadingSignal.set(false);
    }
  }
}
