import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-student-reports',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './student-reports.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class StudentReports {
  protected readonly data = signal([
    {
        "id": 1,
        "reportname": "Mid-Term Defaulters",
        "generatedby": "System",
        "date": "2024-05-01",
        "type": "Attendance",
        "status": "Ready"
    },
    {
        "id": 2,
        "reportname": "Final Year CGPA",
        "generatedby": "Admin",
        "date": "2024-04-20",
        "type": "Academic",
        "status": "Ready"
    }
]);
}
