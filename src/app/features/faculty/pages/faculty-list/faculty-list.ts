import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { FacultyCard } from '../../components/faculty-card/faculty-card';
import { FacultyTable } from '../../components/faculty-table/faculty-table';
import { type FacultyStatusFilter } from '../../models/faculty.model';
import { Faculty } from '../../services/faculty';

@Component({
  selector: 'app-faculty-list',
  imports: [FacultyCard, FacultyTable, RouterLink],
  templateUrl: './faculty-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyList {
  protected readonly faculty = inject(Faculty);
  private readonly permissions = inject(Permissions);
  private readonly router = inject(Router);

  protected readonly canCreateFaculty = computed(() => this.permissions.can('faculty.create'));
  protected readonly canEditFaculty = computed(() => this.permissions.can('faculty.update'));

  protected onSearch(event: Event): void {
    this.faculty.setSearch((event.target as HTMLInputElement).value);
  }

  protected onDepartmentChange(event: Event): void {
    this.faculty.setDepartment((event.target as HTMLSelectElement).value);
  }

  protected onStatusChange(event: Event): void {
    this.faculty.setStatus((event.target as HTMLSelectElement).value as FacultyStatusFilter);
  }

  protected openFaculty(facultyId: string): void {
    void this.router.navigate(['/faculty', facultyId]);
  }

  protected editFaculty(facultyId: string): void {
    if (!this.canEditFaculty()) {
      return;
    }

    void this.router.navigate(['/faculty', facultyId, 'edit']);
  }
}
