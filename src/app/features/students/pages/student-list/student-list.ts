import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { StudentCard } from '../../components/student-card/student-card';
import { StudentTable } from '../../components/student-table/student-table';
import { type StudentStatusFilter } from '../../models/student.model';
import { Students } from '../../services/students';

@Component({
  selector: 'app-student-list',
  imports: [StudentCard, StudentTable, RouterLink, RouterLinkActive],
  templateUrl: './student-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentList {
  protected readonly students = inject(Students);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);

  protected readonly canCreateStudent = computed(() => this.permissions.hasAnyRole(['admin', 'principal', 'hod', 'professor']));
  protected readonly canEditStudent = computed(() => this.permissions.can('students.update'));
  protected readonly canDeleteStudent = computed(() => this.permissions.hasAnyRole(['admin', 'principal', 'hod', 'professor']));

  protected onSearch(event: Event): void {
    this.students.setSearch((event.target as HTMLInputElement).value);
  }

  protected onDepartmentChange(event: Event): void {
    this.students.setDepartment((event.target as HTMLSelectElement).value);
  }

  protected onStatusChange(event: Event): void {
    this.students.setStatus((event.target as HTMLSelectElement).value as StudentStatusFilter);
  }

  protected openStudent(studentId: string): void {
    void this.router.navigate(['/students', studentId]);
  }

  protected editStudent(studentId: string): void {
    if (!this.canEditStudent()) {
      return;
    }

    void this.router.navigate(['/students', studentId, 'edit']);
  }
}
