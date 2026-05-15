import { computed, inject, Injectable, signal } from '@angular/core';

import { environment } from '../../../environment';
import { findStaticUserByEmail, STATIC_USERS, type StaticUser } from '../auth/static-users';
import { AppwriteAuth } from '../appwrite/appwrite-auth';
import { type AuthUser } from '../models/auth-user.model';
import { Permissions } from './permissions';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly staticSessionKey = 'cms.staticUserId';
  private readonly appwriteAuth = inject(AppwriteAuth);
  private readonly permissions = inject(Permissions);
  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly initializedSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly staticUsers = STATIC_USERS;
  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly initialized = this.initializedSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null);
  readonly isStaticAuth = environment.auth.strategy === 'static';

  async refreshCurrentUser(): Promise<void> {
    if (this.initializedSignal()) {
      return;
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      if (this.isStaticAuth) {
        this.restoreStaticSession();
      } else {
        const user = await this.appwriteAuth.currentUser();
        this.setAuthenticatedUser({
          $id: user.$id,
          email: user.email,
          name: user.name,
          roles: [],
          permissions: [],
          provider: 'appwrite',
        });
      }
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
      if (this.isStaticAuth) {
        this.loginStatic(email, password);
      } else {
        await this.appwriteAuth.createEmailSession(email, password);
        const user = await this.appwriteAuth.currentUser();
        this.setAuthenticatedUser({
          $id: user.$id,
          email: user.email,
          name: user.name,
          roles: [],
          permissions: [],
          provider: 'appwrite',
        });
      }
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
    if (!this.isStaticAuth) {
      await this.appwriteAuth.deleteCurrentSession();
    }

    this.clearStoredStaticSession();
    this.clearAuthenticatedUser();
  }

  loginAsStaticUser(user: StaticUser): void {
    this.loginStatic(user.email, user.password);
  }

  private loginStatic(email: string, password: string): void {
    const user = findStaticUserByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('Invalid development credentials.');
    }

    this.storeStaticSession(user.userId);
    this.setStaticUser(user);
    this.initializedSignal.set(true);
  }

  private restoreStaticSession(): void {
    const userId = this.readStoredStaticSession();
    const user = STATIC_USERS.find((staticUser) => staticUser.userId === userId);

    if (user) {
      this.setStaticUser(user);
      return;
    }

    this.clearAuthenticatedUser();
  }

  private setStaticUser(user: StaticUser): void {
    this.setAuthenticatedUser({
      $id: user.userId,
      email: user.email,
      name: user.name,
      roles: user.roles,
      permissions: user.permissions,
      department: user.department,
      provider: 'static',
    });
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

  private readStoredStaticSession(): string | null {
    try {
      return globalThis.localStorage?.getItem(this.staticSessionKey) ?? null;
    } catch {
      return null;
    }
  }

  private storeStaticSession(userId: string): void {
    try {
      globalThis.localStorage?.setItem(this.staticSessionKey, userId);
    } catch {
      return;
    }
  }

  private clearStoredStaticSession(): void {
    try {
      globalThis.localStorage?.removeItem(this.staticSessionKey);
    } catch {
      return;
    }
  }

  private normalizeError(error: unknown): string {
    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    return 'Unable to complete the authentication request.';
  }
}
