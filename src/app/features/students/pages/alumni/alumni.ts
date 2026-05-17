import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-alumni',
  imports: [CommonModule],
  templateUrl: './alumni.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class Alumni {
  private readonly students = inject(Students);
  readonly data = computed(() => this.students.rows().filter(student => student.status === 'graduated'));
}
