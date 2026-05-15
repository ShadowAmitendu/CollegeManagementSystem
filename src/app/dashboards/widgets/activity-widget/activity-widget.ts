import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Departments } from '../../../features/departments/services/departments';
import { Notifications } from '../../../features/notifications/services/notifications';

@Component({
  selector: 'app-activity-widget',
  imports: [],
  templateUrl: './activity-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ActivityWidget {
  protected readonly departments = inject(Departments);
  protected readonly notifications = inject(Notifications);
}
