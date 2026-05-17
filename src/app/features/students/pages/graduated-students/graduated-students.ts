import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-graduated-students',
  imports: [CommonModule, RouterLink],
  templateUrl: './graduated-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class GraduatedStudents {
  protected readonly data = signal([
    {
        "id": "CS-2020-001",
        "name": "Eve Carter",
        "program": "B.Tech CS",
        "graduationyear": "2024",
        "cgpa": "9.2"
    },
    {
        "id": "ME-2019-021",
        "name": "Frank Wright",
        "program": "B.Tech ME",
        "graduationyear": "2023",
        "cgpa": "8.4"
    }
]);
}
