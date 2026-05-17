import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-defaulters',
  imports: [CommonModule],
  templateUrl: './defaulters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class Defaulters {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => 
    this.studentsService.rows()
      .filter(student => student.attendancePercentage < 75)
      .map(student => ({
        ...student,
        name: `${student.firstName} ${student.lastName}`,
        id: student.$id,
        department: student.departmentName,
        attendance: `${student.attendancePercentage}%`,
        status: student.attendancePercentage < 65 ? 'Critical' : 'Warning'
      }))
  );
}
