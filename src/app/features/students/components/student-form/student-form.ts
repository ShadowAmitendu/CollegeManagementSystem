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
  
  protected readonly programs = [
    'B.Tech Computer Science',
    'B.Tech Electronics',
    'B.Tech Mechanical',
    'B.Tech Civil',
    'B.Sc Physics',
    'B.Sc Mathematics',
  ];

  protected readonly departments = [
    { id: 'dept-cse', name: 'Computer Science' },
    { id: 'dept-ece', name: 'Electronics & Communication' },
    { id: 'dept-me', name: 'Mechanical Engineering' },
    { id: 'dept-ce', name: 'Civil Engineering' },
  ];

  protected readonly advisors = [
    'Dr. Aris Thorne',
    'Dr. Elena Rostova',
    'Prof. Julian Vance',
    'Dr. Sarah Jenkins',
  ];

  protected readonly sections = ['A', 'B', 'C', 'D'];
  protected readonly semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  protected readonly enrollmentYears = [2023, 2024, 2025, 2026, 2027];

  protected readonly form = this.formBuilder.group({
    admissionNumber: [''],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    departmentId: ['', [Validators.required]],
    departmentName: ['', [Validators.required]],
    program: ['', [Validators.required]],
    section: ['', [Validators.required]],
    semester: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
    enrollmentYear: [2026, [Validators.required, Validators.min(2000)]],
    advisorName: [''],
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
      status: 'active',
    });
  });

  protected onDepartmentChange(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    const dept = this.departments.find(d => d.id === id);
    if (dept) {
      this.form.patchValue({
        departmentId: dept.id,
        departmentName: dept.name,
      });
    }
  }

  protected submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      ...this.form.getRawValue(),
      cgpa: 0,
      attendancePercentage: 0,
    } as StudentFormValue);
  }
}
