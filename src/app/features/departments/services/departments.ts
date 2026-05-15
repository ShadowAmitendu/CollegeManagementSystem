import { computed, Injectable, signal } from '@angular/core';

import { DEPARTMENTS } from '../data/departments-static-data';
import { type Department, type DepartmentStatusFilter } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class Departments {
  private readonly rowsSignal = signal<readonly Department[]>(DEPARTMENTS);
  private readonly searchSignal = signal('');
  private readonly statusSignal = signal<DepartmentStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const status = this.statusSignal();

    return this.rowsSignal().filter((department) => {
      const matchesStatus = status === 'all' || department.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          department.code,
          department.name,
          department.description,
          department.hodName,
          department.building,
          ...department.programs,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  });

  readonly stats = computed(() => {
    const departments = this.rowsSignal();
    const active = departments.filter((department) => department.status === 'active').length;
    const students = departments.reduce((sum, department) => sum + department.studentCount, 0);
    const faculty = departments.reduce((sum, department) => sum + department.facultyCount, 0);
    const courses = departments.reduce((sum, department) => sum + department.activeCourses, 0);

    return [
      { label: 'Departments', value: String(departments.length) },
      { label: 'Active', value: String(active) },
      { label: 'Students', value: String(students) },
      { label: 'Faculty', value: String(faculty) },
      { label: 'Courses', value: String(courses) },
    ] as const;
  });

  async load(): Promise<void> {
    return Promise.resolve();
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setStatus(value: DepartmentStatusFilter): void {
    this.statusSignal.set(value);
  }

  getDepartment(departmentId: string): Department | undefined {
    return this.rowsSignal().find((department) => department.$id === departmentId);
  }
}
