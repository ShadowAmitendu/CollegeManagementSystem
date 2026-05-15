import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type CreateFacultyPayload, type FacultyMember, type UpdateFacultyPayload } from '../models/faculty.model';

@Injectable({ providedIn: 'root' })
export class FacultyApi {
  private readonly database = inject(AppwriteDatabase);
  private readonly tableId = APPWRITE_CONFIG.tables.faculty;

  list(queries: string[] = []) {
    return this.database.listRows<FacultyMember>(this.tableId, queries);
  }

  get(facultyId: string) {
    return this.database.getRow<FacultyMember>(this.tableId, facultyId);
  }

  create(payload: CreateFacultyPayload) {
    return this.database.createRow<FacultyMember>(this.tableId, payload);
  }

  update(facultyId: string, payload: UpdateFacultyPayload) {
    return this.database.updateRow<FacultyMember>(this.tableId, facultyId, payload);
  }
}
