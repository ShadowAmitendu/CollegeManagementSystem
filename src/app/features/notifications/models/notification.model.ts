import { type Models } from 'appwrite';

export type NotificationStatus = 'draft' | 'published' | 'archived';
export type NotificationStatusFilter = 'all' | NotificationStatus;
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type NotificationCategory = 'academic' | 'library' | 'attendance' | 'system' | 'events';

export interface CmsNotification extends Models.Row {
  readonly title: string;
  readonly message: string;
  readonly category: NotificationCategory;
  readonly priority: NotificationPriority;
  readonly audienceLabel: string;
  readonly audiencePermission?: string;
  readonly createdByUserId: string;
  readonly createdByName: string;
  readonly publishedAt?: string;
  readonly expiresAt?: string;
  readonly readCount: number;
  readonly status: NotificationStatus;
}

export type CreateNotificationPayload = Omit<CmsNotification, keyof Models.Row>;
export type UpdateNotificationPayload = Partial<CreateNotificationPayload>;
