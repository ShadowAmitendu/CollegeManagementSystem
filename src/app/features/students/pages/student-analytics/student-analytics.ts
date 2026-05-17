import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Students } from '../../services/students';

@Component({
  selector: 'app-student-analytics',
  imports: [CommonModule],
  templateUrl: './student-analytics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class StudentAnalytics {
  private readonly studentsService = inject(Students);

  protected readonly metrics = computed(() => {
    const rows = this.studentsService.rows();
    const total = rows.length;
    
    if (total === 0) {
      return [
        { label: 'Total Enrolled', value: '0', trend: 'No data', positive: true },
        { label: 'Average Attendance', value: '0%', trend: 'No data', positive: true },
        { label: 'Defaulter Rate', value: '0%', trend: 'No data', positive: true },
        { label: 'Graduation Rate', value: '0%', trend: 'No data', positive: true }
      ];
    }

    const active = rows.filter(s => s.status === 'active').length;
    const avgAttendance = Math.round(rows.reduce((sum, s) => sum + s.attendancePercentage, 0) / total);
    const defaulters = rows.filter(s => s.attendancePercentage < 75).length;
    const defaulterRate = ((defaulters / total) * 100).toFixed(1);
    const graduated = rows.filter(s => s.status === 'graduated').length;
    const graduationRate = ((graduated / total) * 100).toFixed(1);

    return [
      { label: 'Total Enrolled', value: String(total), trend: `Active: ${active}`, positive: true },
      { label: 'Average Attendance', value: `${avgAttendance}%`, trend: 'Target: >75%', positive: avgAttendance >= 75 },
      { label: 'Defaulter Rate', value: `${defaulterRate}%`, trend: 'Attendance < 75%', positive: parseFloat(defaulterRate) < 10 },
      { label: 'Graduation Rate', value: `${graduationRate}%`, trend: `Graduated: ${graduated}`, positive: true }
    ];
  });
  protected exportData(): void {
    window.print();
  }
}
