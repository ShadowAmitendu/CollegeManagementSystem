import { computed, inject, Injectable, signal } from '@angular/core';

import { AppwriteAuth } from '../appwrite/appwrite-auth';
import { AppwriteDatabase } from '../appwrite/appwrite-database';
import { APPWRITE_CONFIG } from '../utils/constants';
import { type AuthUser } from '../models/auth-user.model';
import { Permissions } from './permissions';
import { getPermissionsForRoles } from '../utils/permissions';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly appwriteAuth = inject(AppwriteAuth);
  private readonly appwriteDb = inject(AppwriteDatabase);
  private readonly permissions = inject(Permissions);
  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly initializedSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly initialized = this.initializedSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null);

  async refreshCurrentUser(): Promise<void> {
    if (this.initializedSignal()) {
      return;
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const user = await this.appwriteAuth.currentUser();
      let roles: string[] = [];
      try {
        const profile = await this.appwriteDb.getRow<any>(APPWRITE_CONFIG.tables.users, user.$id);
        roles = profile.roleIds || [];
      } catch (err) {
        console.warn('Could not fetch user profile', err);
      }

      this.setAuthenticatedUser({
        $id: user.$id,
        email: user.email,
        name: user.name,
        roles: roles as any,
        permissions: getPermissionsForRoles(roles),
        provider: 'appwrite',
      });
    } catch {
      this.clearAuthenticatedUser();
    } finally {
      this.initializedSignal.set(true);
      this.loadingSignal.set(false);
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      await this.appwriteAuth.createEmailSession(email, password);
      const user = await this.appwriteAuth.currentUser();
      
      let roles: string[] = [];
      try {
        const profile = await this.appwriteDb.getRow<any>(APPWRITE_CONFIG.tables.users, user.$id);
        roles = profile.roleIds || [];
      } catch (err) {
        console.warn('Could not fetch user profile', err);
      }

      this.setAuthenticatedUser({
        $id: user.$id,
        email: user.email,
        name: user.name,
        roles: roles as any,
        permissions: getPermissionsForRoles(roles), 
        provider: 'appwrite',
      });
    } catch (error) {
      this.errorSignal.set(this.normalizeError(error));
      throw error;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async register(email: string, password: string, name: string): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      await this.appwriteAuth.createAccount(email, password, name);
      await this.login(email, password);
    } catch (error) {
      this.errorSignal.set(this.normalizeError(error));
      throw error;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.appwriteAuth.deleteCurrentSession();
    this.clearAuthenticatedUser();
  }

  private setAuthenticatedUser(user: AuthUser): void {
    this.userSignal.set(user);
    this.permissions.setPrincipal({
      userId: user.$id,
      roles: user.roles,
      permissions: user.permissions,
    });
  }

  private clearAuthenticatedUser(): void {
    this.userSignal.set(null);
    this.permissions.setPrincipal(null);
  }

  private normalizeError(error: unknown): string {
    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    return 'Unable to complete the authentication request.';
  }
}
