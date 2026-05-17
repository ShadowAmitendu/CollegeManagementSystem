import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { StudentProfileHeader } from '../../components/student-profile-header/student-profile-header';
import { Students } from '../../services/students';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink, StudentProfileHeader],
  templateUrl: './student-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly permissions = inject(Permissions);
  protected readonly students = inject(Students);

  protected readonly student = computed(() => this.students.getStudent(this.route.snapshot.paramMap.get('id') ?? ''));
  protected readonly canEditStudent = computed(() => this.permissions.can('students.update'));
  protected readonly canDeleteStudent = computed(() => this.permissions.hasAnyRole(['admin', 'principal', 'hod', 'professor']));

  protected editStudent(studentId: string): void {
    if (!this.canEditStudent()) {
      return;
    }

    void this.router.navigate(['/students', studentId, 'edit']);
  }

  protected deleteStudent(studentId: string): void {
    if (!this.canDeleteStudent()) {
      return;
    }

    this.students.deleteStudent(studentId);
    void this.router.navigate(['/students']);
  }
}
