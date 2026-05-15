import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FacultyForm } from '../../components/faculty-form/faculty-form';
import { type FacultyFormValue } from '../../models/faculty.model';
import { Faculty } from '../../services/faculty';

@Component({
  selector: 'app-faculty-edit',
  imports: [RouterLink, FacultyForm],
  templateUrl: './faculty-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly faculty = inject(Faculty);
  protected readonly member = computed(() => this.faculty.getFacultyMember(this.route.snapshot.paramMap.get('id') ?? ''));

  protected saveFaculty(value: FacultyFormValue): void {
    const member = this.member();

    if (!member) {
      return;
    }

    this.faculty.updateFacultyMember(member.$id, value);
    void this.router.navigate(['/faculty', member.$id]);
  }

  protected cancel(): void {
    const member = this.member();
    void this.router.navigate(member ? ['/faculty', member.$id] : ['/faculty']);
  }
}
