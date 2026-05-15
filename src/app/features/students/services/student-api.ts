import { inject, Injectable } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type CreateStudentPayload, type Student, type UpdateStudentPayload } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentApi {
  private readonly database = inject(AppwriteDatabase);
  private readonly tableId = APPWRITE_CONFIG.tables.students;

  list(queries: string[] = []) {
    return this.database.listRows<Student>(this.tableId, queries);
  }

  get(studentId: string) {
    return this.database.getRow<Student>(this.tableId, studentId);
  }

  create(payload: CreateStudentPayload) {
    return this.database.createRow<Student>(this.tableId, payload);
  }

  update(studentId: string, payload: UpdateStudentPayload) {
    return this.database.updateRow<Student>(this.tableId, studentId, payload);
  }

  delete(studentId: string) {
    return this.database.deleteRow(this.tableId, studentId);
  }
}
