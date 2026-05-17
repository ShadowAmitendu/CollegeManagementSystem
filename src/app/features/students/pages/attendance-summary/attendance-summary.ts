import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-attendance-summary',
  imports: [CommonModule, RouterLink],
  templateUrl: './attendance-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class AttendanceSummary {
  protected readonly data = signal([
    {
        "id": 1,
        "program": "B.Tech CS",
        "totalstudents": "120",
        "present": "110",
        "absent": "10",
        "percentage": "91.6%"
    },
    {
        "id": 2,
        "program": "B.Tech ME",
        "totalstudents": "80",
        "present": "65",
        "absent": "15",
        "percentage": "81.2%"
    }
]);
}
