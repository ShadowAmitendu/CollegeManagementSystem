import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type FacultyMember } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-card',
  imports: [],
  templateUrl: './faculty-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyCard {
  readonly faculty = input.required<FacultyMember>();
  readonly viewFaculty = output<string>();
  readonly editFaculty = output<string>();

  protected readonly fullName = computed(() => `${this.faculty().firstName} ${this.faculty().lastName}`);
  protected readonly statusClass = computed(() =>
    this.faculty().status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-[#faf9f5] text-[#3d3d3a]',
  );
}
