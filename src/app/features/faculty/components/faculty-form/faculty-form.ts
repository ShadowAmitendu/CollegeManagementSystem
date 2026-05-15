import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { type FacultyFormValue, type FacultyMember, type FacultyStatus } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-form',
  imports: [ReactiveFormsModule],
  templateUrl: './faculty-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyForm {
  readonly faculty = input<FacultyMember | null>(null);
  readonly mode = input<'create' | 'edit'>('create');
  readonly save = output<FacultyFormValue>();
  readonly cancel = output<void>();

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly statuses: readonly FacultyStatus[] = ['active', 'inactive'];
  protected readonly form = this.formBuilder.group({
    employeeNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    departmentId: ['', [Validators.required]],
    departmentName: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    office: ['', [Validators.required]],
    joinedYear: [2026, [Validators.required, Validators.min(1950)]],
    coursesAssigned: [0, [Validators.required, Validators.min(0)]],
    adviseeCount: [0, [Validators.required, Validators.min(0)]],
    status: ['active' as FacultyStatus, [Validators.required]],
  });

  private readonly syncForm = effect(() => {
    const faculty = this.faculty();

    if (faculty) {
      this.form.patchValue({
        employeeNumber: faculty.employeeNumber,
        firstName: faculty.firstName,
        lastName: faculty.lastName,
        email: faculty.email,
        phone: faculty.phone,
        departmentId: faculty.departmentId,
        departmentName: faculty.departmentName,
        designation: faculty.designation,
        specialization: faculty.specialization,
        office: faculty.office,
        joinedYear: faculty.joinedYear,
        coursesAssigned: faculty.coursesAssigned,
        adviseeCount: faculty.adviseeCount,
        status: faculty.status,
      });
      return;
    }

    this.form.reset({
      employeeNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      departmentId: 'dept-cse',
      departmentName: 'Computer Science',
      designation: 'Assistant Professor',
      specialization: '',
      office: '',
      joinedYear: 2026,
      coursesAssigned: 0,
      adviseeCount: 0,
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
