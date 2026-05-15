import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fees-widget',
  imports: [],
  templateUrl: './fees-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FeesWidget {
}
