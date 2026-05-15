import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentCard } from '../../components/department-card/department-card';
import { DepartmentTable } from '../../components/department-table/department-table';
import { type DepartmentStatusFilter } from '../../models/department.model';
import { Departments } from '../../services/departments';

@Component({
  selector: 'app-department-list',
  imports: [DepartmentCard, DepartmentTable],
  templateUrl: './department-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartmentList {
  protected readonly departments = inject(Departments);
  private readonly router = inject(Router);

  protected onSearch(event: Event): void {
    this.departments.setSearch((event.target as HTMLInputElement).value);
  }

  protected onStatusChange(event: Event): void {
    this.departments.setStatus((event.target as HTMLSelectElement).value as DepartmentStatusFilter);
  }

  protected openDepartment(departmentId: string): void {
    void this.router.navigate(['/departments', departmentId]);
  }
}
