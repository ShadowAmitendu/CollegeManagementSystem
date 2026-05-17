import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Students } from '../../services/students';

@Component({
  selector: 'app-attendance-summary',
  imports: [CommonModule, RouterLink],
  templateUrl: './attendance-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class AttendanceSummary {
  private readonly studentsService = inject(Students);

  protected readonly data = computed(() => {
    const rows = this.studentsService.rows();
    const programs = Array.from(new Set(rows.map(s => s.program)));
    
    return programs.map((program, index) => {
      const programStudents = rows.filter(s => s.program === program);
      const total = programStudents.length;
      const avgAttendance = total === 0 ? 0 : programStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / total;
      const present = Math.round((avgAttendance / 100) * total);
      
      return {
        id: index + 1,
        date: '17 May 2026',
        time: '10:00 AM',
        subject: `${program} - Class ${index + 1}`,
        faculty: 'Dr. Faculty',
        status: index % 2 === 0 ? 'Published' : 'Draft',
        summary: `${present}/${total} Present`
      };
    });
  });
}
