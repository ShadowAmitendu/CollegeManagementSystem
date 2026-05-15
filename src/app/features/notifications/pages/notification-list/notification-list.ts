import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { Permissions } from '../../../../core/services/permissions';
import { NotificationCard } from '../../components/notification-card/notification-card';
import { type NotificationStatusFilter } from '../../models/notification.model';
import { Notifications } from '../../services/notifications';

@Component({
  selector: 'app-notification-list',
  imports: [NotificationCard],
  templateUrl: './notification-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NotificationList {
  protected readonly notifications = inject(Notifications);
  private readonly permissions = inject(Permissions);
  protected readonly canManageNotifications = computed(() => this.permissions.can('notifications.create'));

  protected onSearch(event: Event): void {
    this.notifications.setSearch((event.target as HTMLInputElement).value);
  }

  protected onStatusChange(event: Event): void {
    this.notifications.setStatus((event.target as HTMLSelectElement).value as NotificationStatusFilter);
  }

  protected publishNotification(notificationId: string): void {
    if (this.canManageNotifications()) {
      this.notifications.publish(notificationId);
    }
  }

  protected archiveNotification(notificationId: string): void {
    if (this.canManageNotifications()) {
      this.notifications.archive(notificationId);
    }
  }
}
