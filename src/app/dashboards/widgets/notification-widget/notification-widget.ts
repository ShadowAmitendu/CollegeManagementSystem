import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Notifications } from '../../../features/notifications/services/notifications';

@Component({
  selector: 'app-notification-widget',
  imports: [RouterLink],
  templateUrl: './notification-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotificationWidget {
  protected readonly notifications = inject(Notifications);
}
