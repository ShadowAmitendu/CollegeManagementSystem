import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-defaulters',
  imports: [CommonModule, RouterLink],
  templateUrl: './defaulters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class Defaulters {
  protected readonly data = signal([
    {
        "id": "CS-2024-001",
        "name": "Alice Smith",
        "department": "Computer Science",
        "attendance": "65%",
        "status": "Critical"
    },
    {
        "id": "ME-2024-042",
        "name": "Bob Johnson",
        "department": "Mechanical",
        "attendance": "71%",
        "status": "Warning"
    }
]);
}
