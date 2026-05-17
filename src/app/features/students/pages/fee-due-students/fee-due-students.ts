import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-fee-due-students',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './fee-due-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class FeeDueStudents {
  protected readonly data = signal([
    {
        "id": "EC-2023-011",
        "name": "Charlie Davis",
        "feetype": "Tuition",
        "amountdue": "$1,200",
        "duedate": "2024-06-15"
    },
    {
        "id": "CS-2022-099",
        "name": "Diana Prince",
        "feetype": "Hostel",
        "amountdue": "$450",
        "duedate": "2024-05-30"
    }
]);
}
