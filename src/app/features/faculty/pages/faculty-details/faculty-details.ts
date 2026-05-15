import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Permissions } from '../../../../core/services/permissions';
import { Faculty } from '../../services/faculty';

@Component({
  selector: 'app-faculty-details',
  imports: [RouterLink],
  templateUrl: './faculty-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly permissions = inject(Permissions);
  protected readonly faculty = inject(Faculty);

  protected readonly member = computed(() => this.faculty.getFacultyMember(this.route.snapshot.paramMap.get('id') ?? ''));
  protected readonly canEditFaculty = computed(() => this.permissions.can('faculty.update'));

  protected editFaculty(facultyId: string): void {
    if (!this.canEditFaculty()) {
      return;
    }

    void this.router.navigate(['/faculty', facultyId, 'edit']);
  }
}
