import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-fee-due-students',
  imports: [CommonModule],
  templateUrl: './fee-due-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class FeeDueStudents {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => 
    this.studentsService.rows().map(student => ({
      ...student,
      name: `${student.firstName} ${student.lastName}`,
      id: student.$id,
      feetype: 'Tuition',
      amountdue: '$1,200',
      duedate: '2024-06-15'
    }))
  );
}
