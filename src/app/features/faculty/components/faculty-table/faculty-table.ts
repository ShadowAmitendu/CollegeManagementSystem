import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type FacultyMember } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-table',
  imports: [],
  templateUrl: './faculty-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyTable {
  readonly faculty = input.required<readonly FacultyMember[]>();
  readonly viewFaculty = output<string>();
  readonly editFaculty = output<string>();
}
