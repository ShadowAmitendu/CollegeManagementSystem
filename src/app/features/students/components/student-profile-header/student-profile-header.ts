import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type Student } from '../../models/student.model';

@Component({
  selector: 'app-student-profile-header',
  imports: [],
  templateUrl: './student-profile-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentProfileHeader {
  readonly student = input.required<Student>();
  readonly editStudent = output<string>();

  protected readonly initials = computed(() => `${this.student().firstName[0] ?? ''}${this.student().lastName[0] ?? ''}`);
  protected readonly fullName = computed(() => `${this.student().firstName} ${this.student().lastName}`);
}
