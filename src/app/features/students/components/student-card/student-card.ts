import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentCard {
  readonly student = input.required<Student>();
  readonly viewStudent = output<string>();
  readonly editStudent = output<string>();

  protected readonly fullName = computed(() => `${this.student().firstName} ${this.student().lastName}`);

  protected readonly statusClass = computed(() => {
    const status = this.student().status;

    if (status === 'active') {
      return 'bg-emerald-50 text-emerald-800';
    }

    if (status === 'graduated') {
      return 'bg-[#181715] text-[#faf9f5]';
    }

    if (status === 'suspended') {
      return 'bg-rose-50 text-rose-800';
    }

    return 'bg-[#faf9f5] text-[#3d3d3a]';
  });
}
