import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { type Department } from '../../models/department.model';

@Component({
  selector: 'app-department-table',
  imports: [],
  templateUrl: './department-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartmentTable {
  readonly departments = input.required<readonly Department[]>();
  readonly viewDepartment = output<string>();
}
