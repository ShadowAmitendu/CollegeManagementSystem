import { computed, Injectable, signal } from '@angular/core';

import { STUDENTS } from '../data/students-static-data';
import { type Student, type StudentFormValue, type StudentStatusFilter } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private readonly rowsSignal = signal<readonly Student[]>(STUDENTS);
  private readonly searchSignal = signal('');
  private readonly departmentSignal = signal('all');
  private readonly statusSignal = signal<StudentStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedDepartment = this.departmentSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

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
    return Promise.resolve();
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

  createStudent(value: StudentFormValue): Student {
    const id = `stu-${value.admissionNumber.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
    const now = new Date().toISOString();
    const student: Student = {
      ...value,
      $id: id,
      $sequence: id,
      $createdAt: now,
      $updatedAt: now,
      $permissions: [],
      $databaseId: 'college-management',
      $tableId: 'students',
      userId: `usr-${value.admissionNumber.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`,
    };

    this.rowsSignal.update((rows) => [student, ...rows]);
    return student;
  }

  updateStudent(studentId: string, value: StudentFormValue): void {
    this.rowsSignal.update((rows) =>
      rows.map((student) => (student.$id === studentId ? { ...student, ...value, $updatedAt: new Date().toISOString() } : student)),
    );
  }

  deleteStudent(studentId: string): void {
    this.rowsSignal.update((rows) => rows.filter((student) => student.$id !== studentId));
  }
}
