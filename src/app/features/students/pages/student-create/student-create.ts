import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { StudentForm } from '../../components/student-form/student-form';
import { type StudentFormValue } from '../../models/student.model';
import { Students } from '../../services/students';
import { Permissions } from '../../../../core/services/permissions';

@Component({
  selector: 'app-student-create',
  imports: [RouterLink, StudentForm],
  templateUrl: './student-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentCreate {
  private readonly students = inject(Students);
  private readonly router = inject(Router);
  private readonly permissions = inject(Permissions);

  protected saveStudent(value: StudentFormValue): void {
    if (!this.permissions.hasAnyRole(['admin', 'principal', 'hod', 'professor'])) {
      alert('Access Denied: You do not have permission to add students.');
      return;
    }
    const student = this.students.createStudent(value);
    void this.router.navigate(['/students', student.$id]);
  }

  protected cancel(): void {
    void this.router.navigate(['/students']);
  }
}
