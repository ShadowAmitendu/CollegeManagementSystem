import { computed, inject, Injectable, signal } from '@angular/core';

import { StudentApi } from './student-api';
import { AppwriteAuth } from '../../../core/appwrite/appwrite-auth';
import { type CreateStudentPayload, type Student, type StudentFormValue, type StudentStatusFilter } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private readonly api = inject(StudentApi);
  private readonly appwriteAuth = inject(AppwriteAuth);
  private readonly rowsSignal = signal<readonly Student[]>([]);
  private readonly searchSignal = signal('');
  private readonly departmentSignal = signal('all');
  private readonly statusSignal = signal<StudentStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedDepartment = this.departmentSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

  constructor() {
    void this.load();
  }

  readonly departments = computed(() =>
    Array.from(new Set(this.rowsSignal().map((student) => student.departmentName))).sort((first, second) =>
      first.localeCompare(second),
    ),
  );

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const department = this.departmentSignal();
    const status = this.statusSignal();

    return this.rowsSignal().filter((student) => {
      const matchesDepartment = department === 'all' || student.departmentName === department;
      const matchesStatus = status === 'all' || student.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          student.firstName,
          student.lastName,
          student.email,
          student.admissionNumber,
          student.program,
          student.section,
          student.advisorName,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const rows = this.rowsSignal();
    const active = rows.filter((student) => student.status === 'active').length;
    const averageAttendance =
      rows.length === 0 ? 0 : Math.round(rows.reduce((sum, student) => sum + student.attendancePercentage, 0) / rows.length);
    const averageCgpa = rows.length === 0 ? '0.0' : (rows.reduce((sum, student) => sum + student.cgpa, 0) / rows.length).toFixed(1);

    return [
      { label: 'Students', value: String(rows.length) },
      { label: 'Active', value: String(active) },
      { label: 'Departments', value: String(this.departments().length) },
      { label: 'Avg attendance', value: `${averageAttendance}%` },
      { label: 'Avg CGPA', value: averageCgpa },
    ] as const;
  });

  async load(): Promise<void> {
    try {
      const response = await this.api.list();
      this.rowsSignal.set(response.rows);
    } catch (error) {
      console.error('Failed to load students', error);
    }
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setDepartment(value: string): void {
    this.departmentSignal.set(value);
  }

  setStatus(value: StudentStatusFilter): void {
    this.statusSignal.set(value);
  }

  getStudent(studentId: string): Student | undefined {
    return this.rowsSignal().find((student) => student.$id === studentId);
  }

  async createStudent(value: StudentFormValue): Promise<Student> {
    const name = `${value.firstName} ${value.lastName}`;
    const password = 'Welcome@CMS123'; // Default password
    
    const account = await this.appwriteAuth.createAccount(value.email, password, name);
    const userId = account.$id;

    const payload: CreateStudentPayload = {
      ...value,
      userId,
    };
    const student = await this.api.create(payload);
    this.rowsSignal.update((rows) => [student, ...rows]);
    return student;
  }

  async updateStudent(studentId: string, value: StudentFormValue): Promise<void> {
    const updated = await this.api.update(studentId, value);
    this.rowsSignal.update((rows) =>
      rows.map((student) => (student.$id === studentId ? updated : student)),
    );
  }

  async deleteStudent(studentId: string): Promise<void> {
    await this.api.delete(studentId);
    this.rowsSignal.update((rows) => rows.filter((student) => student.$id !== studentId));
  }
}
