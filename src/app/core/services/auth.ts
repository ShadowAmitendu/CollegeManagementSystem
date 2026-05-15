import { computed, inject, Injectable, signal } from '@angular/core';
import { type Models } from 'appwrite';

import { AppwriteAuth } from '../appwrite/appwrite-auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly appwriteAuth = inject(AppwriteAuth);
  private readonly userSignal = signal<Models.User<Models.Preferences> | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null);

  async refreshCurrentUser(): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      this.userSignal.set(await this.appwriteAuth.currentUser());
    } catch {
      this.userSignal.set(null);
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      await this.appwriteAuth.createEmailSession(email, password);
      this.userSignal.set(await this.appwriteAuth.currentUser());
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
    this.userSignal.set(null);
  }

  private normalizeError(error: unknown): string {
    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    return 'Unable to complete the authentication request.';
  }
}
