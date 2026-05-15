import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { StudentForm } from '../../components/student-form/student-form';
import { type StudentFormValue } from '../../models/student.model';
import { Students } from '../../services/students';

@Component({
  selector: 'app-student-edit',
  imports: [RouterLink, StudentForm],
  templateUrl: './student-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly students = inject(Students);
  protected readonly student = computed(() => this.students.getStudent(this.route.snapshot.paramMap.get('id') ?? ''));

  protected saveStudent(value: StudentFormValue): void {
    const student = this.student();

    if (!student) {
      return;
    }

    this.students.updateStudent(student.$id, value);
    void this.router.navigate(['/students', student.$id]);
  }

  protected cancel(): void {
    const student = this.student();
    void this.router.navigate(student ? ['/students', student.$id] : ['/students']);
  }
}
