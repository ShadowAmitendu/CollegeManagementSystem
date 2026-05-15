import { type CmsRole, type PermissionCode } from '../utils/permissions';

export interface AuthUser {
  readonly $id: string;
  readonly email: string;
  readonly name: string;
  readonly roles: readonly CmsRole[];
  readonly permissions: readonly PermissionCode[];
  readonly department?: string;
  readonly provider: 'static' | 'appwrite';
}
