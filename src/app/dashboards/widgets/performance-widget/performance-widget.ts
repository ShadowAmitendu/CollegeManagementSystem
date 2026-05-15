import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Faculty } from '../../../features/faculty/services/faculty';
import { Students } from '../../../features/students/services/students';

@Component({
  selector: 'app-performance-widget',
  imports: [RouterLink],
  templateUrl: './performance-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class PerformanceWidget {
  protected readonly students = inject(Students);
  protected readonly faculty = inject(Faculty);
}
