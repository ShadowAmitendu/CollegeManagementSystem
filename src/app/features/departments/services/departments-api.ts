import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type CreateDepartmentPayload, type Department, type UpdateDepartmentPayload } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentsApi {
  private readonly database = inject(AppwriteDatabase);
  private readonly tableId = APPWRITE_CONFIG.tables.departments;

  list(queries: string[] = []) {
    return this.database.listRows<Department>(this.tableId, queries);
  }

  get(departmentId: string) {
    return this.database.getRow<Department>(this.tableId, departmentId);
  }

  create(payload: CreateDepartmentPayload) {
    return this.database.createRow<Department>(this.tableId, payload);
  }

  update(departmentId: string, payload: UpdateDepartmentPayload) {
    return this.database.updateRow<Department>(this.tableId, departmentId, payload);
  }
}
