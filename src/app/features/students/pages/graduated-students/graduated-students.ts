import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-graduated-students',
  imports: [CommonModule],
  templateUrl: './graduated-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class GraduatedStudents {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => 
    this.studentsService.rows()
      .filter(student => student.status === 'graduated')
      .map(student => ({
        ...student,
        name: `${student.firstName} ${student.lastName}`,
        id: student.$id,
        graduationyear: String(student.enrollmentYear + 4)
      }))
  );
}
