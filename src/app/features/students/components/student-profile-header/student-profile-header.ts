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
  readonly canDelete = input<boolean>(false);
  readonly editStudent = output<string>();
  readonly deleteStudent = output<string>();

  protected readonly initials = computed(() => {
    const s = this.student() as any;
    const first = s.firstName?.[0] || s.name?.[0] || 'U';
    const last = s.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  });
  protected readonly fullName = computed(() => {
    const s = this.student() as any;
    if (s.name) return s.name;
    return `${s.firstName ?? 'Unknown'} ${s.lastName ?? 'Student'}`.trim();
  });
}
