import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-cr-management',
  imports: [CommonModule],
  templateUrl: './cr-management.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class CrManagement {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => 
    this.studentsService.rows().slice(0, 5).map(student => ({
      ...student,
      name: `${student.firstName} ${student.lastName}`,
      id: student.$id,
      batch: String(student.enrollmentYear),
      section: student.section,
      assignedby: 'HOD'
    }))
  );
}
