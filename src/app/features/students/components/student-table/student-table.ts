import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type Student } from '../../models/student.model';

@Component({
  selector: 'app-student-table',
  imports: [],
  templateUrl: './student-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class StudentTable {
  readonly students = input.required<readonly Student[]>();
  readonly viewStudent = output<string>();
  readonly editStudent = output<string>();
}
