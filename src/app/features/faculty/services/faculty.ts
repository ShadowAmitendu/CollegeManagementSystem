import { computed, Injectable, signal } from '@angular/core';

import { FACULTY_MEMBERS } from '../data/faculty-static-data';
import { type FacultyFormValue, type FacultyMember, type FacultyStatusFilter } from '../models/faculty.model';

@Injectable({ providedIn: 'root' })
export class Faculty {
  private readonly rowsSignal = signal<readonly FacultyMember[]>(FACULTY_MEMBERS);
  private readonly searchSignal = signal('');
  private readonly departmentSignal = signal('all');
  private readonly statusSignal = signal<FacultyStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedDepartment = this.departmentSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

  readonly departments = computed(() =>
    Array.from(new Set(this.rowsSignal().map((faculty) => faculty.departmentName))).sort((first, second) =>
      first.localeCompare(second),
    ),
  );

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const department = this.departmentSignal();
    const status = this.statusSignal();

    return this.rowsSignal().filter((faculty) => {
      const matchesDepartment = department === 'all' || faculty.departmentName === department;
      const matchesStatus = status === 'all' || faculty.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          faculty.firstName,
          faculty.lastName,
          faculty.email,
          faculty.employeeNumber,
          faculty.designation,
          faculty.specialization,
          faculty.office,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const rows = this.rowsSignal();
    const active = rows.filter((faculty) => faculty.status === 'active').length;
    const courses = rows.reduce((sum, faculty) => sum + faculty.coursesAssigned, 0);
    const advisees = rows.reduce((sum, faculty) => sum + faculty.adviseeCount, 0);

    return [
      { label: 'Faculty', value: String(rows.length) },
      { label: 'Active', value: String(active) },
      { label: 'Departments', value: String(this.departments().length) },
      { label: 'Courses', value: String(courses) },
      { label: 'Advisees', value: String(advisees) },
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

  setStatus(value: FacultyStatusFilter): void {
    this.statusSignal.set(value);
  }

  getFacultyMember(facultyId: string): FacultyMember | undefined {
    return this.rowsSignal().find((faculty) => faculty.$id === facultyId);
  }

  createFacultyMember(value: FacultyFormValue): FacultyMember {
    const id = `fac-${value.employeeNumber.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
    const now = new Date().toISOString();
    const faculty: FacultyMember = {
      ...value,
      $id: id,
      $sequence: id,
      $createdAt: now,
      $updatedAt: now,
      $permissions: [],
      $databaseId: 'college-management',
      $tableId: 'faculty',
      userId: `usr-${value.employeeNumber.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`,
    };

    this.rowsSignal.update((rows) => [faculty, ...rows]);
    return faculty;
  }

  updateFacultyMember(facultyId: string, value: FacultyFormValue): void {
    this.rowsSignal.update((rows) =>
      rows.map((faculty) => (faculty.$id === facultyId ? { ...faculty, ...value, $updatedAt: new Date().toISOString() } : faculty)),
    );
  }
}
