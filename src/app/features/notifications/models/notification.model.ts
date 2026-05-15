import { type Models } from 'appwrite';

export interface CmsNotification extends Models.Row {
  readonly title: string;
  readonly message: string;
  readonly audiencePermission?: string;
  readonly createdByUserId: string;
  readonly status: 'draft' | 'published' | 'archived';
}

export type CreateNotificationPayload = Omit<CmsNotification, keyof Models.Row>;
export type UpdateNotificationPayload = Partial<CreateNotificationPayload>;
