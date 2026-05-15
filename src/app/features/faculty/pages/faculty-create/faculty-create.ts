import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FacultyForm } from '../../components/faculty-form/faculty-form';
import { type FacultyFormValue } from '../../models/faculty.model';
import { Faculty } from '../../services/faculty';

@Component({
  selector: 'app-faculty-create',
  imports: [RouterLink, FacultyForm],
  templateUrl: './faculty-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FacultyCreate {
  private readonly faculty = inject(Faculty);
  private readonly router = inject(Router);

  protected saveFaculty(value: FacultyFormValue): void {
    const member = this.faculty.createFacultyMember(value);
    void this.router.navigate(['/faculty', member.$id]);
  }

  protected cancel(): void {
    void this.router.navigate(['/faculty']);
  }
}
