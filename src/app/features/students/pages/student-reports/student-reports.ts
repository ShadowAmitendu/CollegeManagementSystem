import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Students } from '../../services/students';

@Component({
  selector: 'app-student-reports',
  imports: [CommonModule],
  templateUrl: './student-reports.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class StudentReports {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => 
    this.studentsService.rows().slice(0, 5).map((student, index) => ({
      id: index + 1,
      reportname: `Performance Report - ${student.firstName} ${student.lastName}`,
      generatedby: 'System',
      date: '2024-05-15',
      type: 'Academic',
      status: 'Ready'
    }))
  );
}
