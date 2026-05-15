import { inject, Injectable, signal } from '@angular/core';

import { DepartmentsApi } from './departments-api';
import { type Department } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class Departments {
  private readonly api = inject(DepartmentsApi);
  private readonly rowsSignal = signal<readonly Department[]>([]);

  readonly rows = this.rowsSignal.asReadonly();

  async load(): Promise<void> {
    const response = await this.api.list();
    this.rowsSignal.set(response.rows);
  }
}
