import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type CreateResultPayload, type Result, type UpdateResultPayload } from '../models/result.model';

@Injectable({ providedIn: 'root' })
export class ResultsApi {
  private readonly database = inject(AppwriteDatabase);
  private readonly tableId = APPWRITE_CONFIG.tables.results;

  list(queries: string[] = []) {
    return this.database.listRows<Result>(this.tableId, queries);
  }

  get(resultId: string) {
    return this.database.getRow<Result>(this.tableId, resultId);
  }

  create(payload: CreateResultPayload) {
    return this.database.createRow<Result>(this.tableId, payload);
  }

  update(resultId: string, payload: UpdateResultPayload) {
    return this.database.updateRow<Result>(this.tableId, resultId, payload);
  }
}
