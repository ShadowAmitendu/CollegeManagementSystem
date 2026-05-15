import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { type Student, type StudentFormValue, type StudentStatus } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentForm {
  readonly student = input<Student | null>(null);
  readonly mode = input<'create' | 'edit'>('create');
  readonly save = output<StudentFormValue>();
  readonly cancel = output<void>();

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly statuses: readonly StudentStatus[] = ['active', 'inactive', 'graduated', 'suspended'];
  protected readonly form = this.formBuilder.group({
    admissionNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    departmentId: ['', [Validators.required]],
    departmentName: ['', [Validators.required]],
    program: ['', [Validators.required]],
    section: ['', [Validators.required]],
    semester: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
    enrollmentYear: [2026, [Validators.required, Validators.min(2000)]],
    advisorName: ['', [Validators.required]],
    cgpa: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    attendancePercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    status: ['active' as StudentStatus, [Validators.required]],
  });

  private readonly syncForm = effect(() => {
    const student = this.student();

    if (student) {
      this.form.patchValue({
        admissionNumber: student.admissionNumber,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        departmentId: student.departmentId,
        departmentName: student.departmentName,
        program: student.program,
        section: student.section,
        semester: student.semester,
        enrollmentYear: student.enrollmentYear,
        advisorName: student.advisorName,
        cgpa: student.cgpa,
        attendancePercentage: student.attendancePercentage,
        status: student.status,
      });
      return;
    }

    this.form.reset({
      admissionNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      departmentId: 'dept-cse',
      departmentName: 'Computer Science',
      program: 'B.Tech Computer Science',
      section: 'A',
      semester: 1,
      enrollmentYear: 2026,
      advisorName: '',
      cgpa: 0,
      attendancePercentage: 0,
      status: 'active',
    });
  });

  protected submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
