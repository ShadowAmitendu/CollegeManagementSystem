import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-suspended-students',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './suspended-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class SuspendedStudents {
  protected readonly data = signal([
    {
        "id": "EE-2023-044",
        "name": "Gary Oak",
        "reason": "Disciplinary",
        "suspendedon": "2024-03-10",
        "duration": "1 Semester"
    }
]);
}
