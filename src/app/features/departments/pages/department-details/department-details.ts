import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Departments } from '../../services/departments';

@Component({
  selector: 'app-department-details',
  imports: [RouterLink],
  templateUrl: './department-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DepartmentDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly departments = inject(Departments);
  protected readonly department = computed(() => this.departments.getDepartment(this.route.snapshot.paramMap.get('id') ?? ''));
}
