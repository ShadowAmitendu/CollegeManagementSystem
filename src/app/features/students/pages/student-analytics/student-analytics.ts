import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-student-analytics',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './student-analytics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class StudentAnalytics {
  protected metrics = signal([
    { label: 'Total Enrolled', value: '4,209', trend: '+12% from last year', positive: true },
    { label: 'Average Attendance', value: '86.4%', trend: '-2.1% from last month', positive: false },
    { label: 'Defaulter Rate', value: '3.2%', trend: '-0.5% from last semester', positive: true },
    { label: 'Placement Rate', value: '92.1%', trend: '+4% from last year', positive: true }
  ]);
}
