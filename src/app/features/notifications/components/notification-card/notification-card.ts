import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { type CmsNotification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotificationCard {
  readonly notification = input.required<CmsNotification>();
  readonly canManage = input(false);
  readonly publishNotification = output<string>();
  readonly archiveNotification = output<string>();

  protected readonly priorityClass = computed(() => {
    const priority = this.notification().priority;

    if (priority === 'urgent' || priority === 'high') {
      return 'bg-[#cc785c] text-white';
    }

    return 'bg-[#faf9f5] text-[#141413]';
  });
}
