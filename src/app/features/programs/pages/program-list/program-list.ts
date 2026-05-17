import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-program-list',
  imports: [CommonModule],
  templateUrl: './program-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class ProgramList {
  protected readonly data = signal([
    {
      id: 1,
      code: 'BTECH-CS',
      name: 'Bachelor of Technology in Computer Science',
      department: 'Computer Science',
      duration: '4 Years',
      type: 'Undergraduate'
    },
    {
      id: 2,
      code: 'BTECH-ME',
      name: 'Bachelor of Technology in Mechanical Engineering',
      department: 'Mechanical',
      duration: '4 Years',
      type: 'Undergraduate'
    }
  ]);
}
