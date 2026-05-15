import { inject, Injectable, signal } from '@angular/core';

import { AppwriteDatabase } from '../../../core/appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../../../core/utils/constants';
import { type CmsNotification, type CreateNotificationPayload, type UpdateNotificationPayload } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class Notifications {
  private readonly database = inject(AppwriteDatabase);
  private readonly rowsSignal = signal<readonly CmsNotification[]>([]);
  private readonly tableId = APPWRITE_CONFIG.tables.notifications;

  readonly rows = this.rowsSignal.asReadonly();

  async load(queries: string[] = []): Promise<void> {
    const response = await this.database.listRows<CmsNotification>(this.tableId, queries);
    this.rowsSignal.set(response.rows);
  }

  create(payload: CreateNotificationPayload) {
    return this.database.createRow<CmsNotification>(this.tableId, payload);
  }

  update(notificationId: string, payload: UpdateNotificationPayload) {
    return this.database.updateRow<CmsNotification>(this.tableId, notificationId, payload);
  }
}
