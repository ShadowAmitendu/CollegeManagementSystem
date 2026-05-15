import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-timetable-widget',
  imports: [],
  templateUrl: './timetable-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TimetableWidget {
}
