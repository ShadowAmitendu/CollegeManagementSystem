import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-alumni',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './alumni.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class Alumni {
  protected readonly data = signal([
    {
        "id": 1,
        "name": "Helen Troy",
        "graduationyear": "2021",
        "currentcompany": "Google",
        "role": "Software Engineer",
        "location": "Mountain View"
    },
    {
        "id": 2,
        "name": "Ian Malcolm",
        "graduationyear": "2018",
        "currentcompany": "InGen",
        "role": "Data Scientist",
        "location": "Costa Rica"
    }
]);
}
