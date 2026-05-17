import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Students } from '../../services/students';

@Component({
  selector: 'app-suspended-students',
  imports: [CommonModule],
  templateUrl: './suspended-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class SuspendedStudents {
  private readonly students = inject(Students);
  readonly data = computed(() => this.students.rows().filter(student => student.status === 'suspended'));
}
