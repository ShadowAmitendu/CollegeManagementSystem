import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type Department } from '../../models/department.model';

@Component({
  selector: 'app-department-card',
  imports: [],
  templateUrl: './department-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartmentCard {
  readonly department = input.required<Department>();
  readonly viewDepartment = output<string>();

  protected readonly statusClass = computed(() =>
    this.department().status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-[#faf9f5] text-[#3d3d3a]',
  );
}
