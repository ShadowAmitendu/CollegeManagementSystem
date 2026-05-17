import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cr-management',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cr-management.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class CrManagement {
  protected readonly data = signal([
    {
        "id": "CS-2025-012",
        "name": "Jack Frost",
        "batch": "2025",
        "section": "A",
        "assignedby": "Dr. Smith"
    },
    {
        "id": "CS-2025-045",
        "name": "Karen Page",
        "batch": "2025",
        "section": "B",
        "assignedby": "Dr. Jones"
    }
]);
}
