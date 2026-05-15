import { inject, Injectable, signal } from '@angular/core';

import { ResultsApi } from './results-api';
import { type Result } from '../models/result.model';

@Injectable({ providedIn: 'root' })
export class Results {
  private readonly api = inject(ResultsApi);
  private readonly rowsSignal = signal<readonly Result[]>([]);

  readonly rows = this.rowsSignal.asReadonly();

  async load(): Promise<void> {
    const response = await this.api.list();
    this.rowsSignal.set(response.rows);
  }
}
