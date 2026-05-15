import { inject, Injectable } from '@angular/core';
import { Account, ID, type Models } from 'appwrite';

import { AppwriteClient } from './appwrite-client';

@Injectable({
  providedIn: 'root',
})
export class AppwriteAuth {
  private readonly account = new Account(inject(AppwriteClient).client);

  currentUser(): Promise<Models.User<Models.Preferences>> {
    return this.account.get();
  }

  createEmailSession(email: string, password: string): Promise<Models.Session> {
    return this.account.createEmailPasswordSession({ email, password });
  }

  createAccount(email: string, password: string, name: string): Promise<Models.User<Models.Preferences>> {
    return this.account.create({ userId: ID.unique(), email, password, name });
  }

  deleteCurrentSession(): Promise<{}> {
    return this.account.deleteSession({ sessionId: 'current' });
  }
}
