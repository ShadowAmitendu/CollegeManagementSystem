import { computed, Injectable, signal } from '@angular/core';

import { CMS_NOTIFICATIONS } from '../data/notifications-static-data';
import {
  type CmsNotification,
  type CreateNotificationPayload,
  type NotificationStatusFilter,
  type UpdateNotificationPayload,
} from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class Notifications {
  private readonly rowsSignal = signal<readonly CmsNotification[]>(CMS_NOTIFICATIONS);
  private readonly searchSignal = signal('');
  private readonly statusSignal = signal<NotificationStatusFilter>('all');

  readonly rows = this.rowsSignal.asReadonly();
  readonly search = this.searchSignal.asReadonly();
  readonly selectedStatus = this.statusSignal.asReadonly();

  readonly filteredRows = computed(() => {
    const query = this.searchSignal().trim().toLowerCase();
    const status = this.statusSignal();

    return this.rowsSignal().filter((notification) => {
      const matchesStatus = status === 'all' || notification.status === status;
      const matchesSearch =
        query.length === 0 ||
        [
          notification.title,
          notification.message,
          notification.category,
          notification.priority,
          notification.audienceLabel,
          notification.createdByName,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  });

  readonly publishedRows = computed(() => this.rowsSignal().filter((notification) => notification.status === 'published'));
  readonly draftRows = computed(() => this.rowsSignal().filter((notification) => notification.status === 'draft'));
  readonly urgentRows = computed(() =>
    this.rowsSignal().filter((notification) => notification.priority === 'urgent' || notification.priority === 'high'),
  );

  readonly stats = computed(() => {
    const rows = this.rowsSignal();

    return [
      { label: 'Notifications', value: String(rows.length) },
      { label: 'Published', value: String(this.publishedRows().length) },
      { label: 'Drafts', value: String(this.draftRows().length) },
      { label: 'High priority', value: String(this.urgentRows().length) },
      { label: 'Reads', value: String(rows.reduce((sum, notification) => sum + notification.readCount, 0)) },
    ] as const;
  });

  async load(): Promise<void> {
    return Promise.resolve();
  }

  setSearch(value: string): void {
    this.searchSignal.set(value);
  }

  setStatus(value: NotificationStatusFilter): void {
    this.statusSignal.set(value);
  }

  create(payload: CreateNotificationPayload): CmsNotification {
    const id = `not-${payload.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
    const now = new Date().toISOString();
    const notification: CmsNotification = {
      ...payload,
      $id: id,
      $sequence: id,
      $createdAt: now,
      $updatedAt: now,
      $permissions: [],
      $databaseId: 'college-management',
      $tableId: 'notifications',
    };

    this.rowsSignal.update((rows) => [notification, ...rows]);
    return notification;
  }

  update(notificationId: string, payload: UpdateNotificationPayload): void {
    this.rowsSignal.update((rows) =>
      rows.map((notification) =>
        notification.$id === notificationId ? { ...notification, ...payload, $updatedAt: new Date().toISOString() } : notification,
      ),
    );
  }

  publish(notificationId: string): void {
    this.update(notificationId, { status: 'published', publishedAt: new Date().toISOString() });
  }

  archive(notificationId: string): void {
    this.update(notificationId, { status: 'archived' });
  }
}
