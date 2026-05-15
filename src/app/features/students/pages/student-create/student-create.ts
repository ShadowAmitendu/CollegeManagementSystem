import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { StudentForm } from '../../components/student-form/student-form';
import { type StudentFormValue } from '../../models/student.model';
import { Students } from '../../services/students';

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

  protected saveStudent(value: StudentFormValue): void {
    const student = this.students.createStudent(value);
    void this.router.navigate(['/students', student.$id]);
  }

  protected cancel(): void {
    void this.router.navigate(['/students']);
  }
}
