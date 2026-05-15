import { inject, Injectable } from '@angular/core';
import { Channel, Realtime, type RealtimeResponseEvent, type RealtimeSubscription } from 'appwrite';

import { AppwriteClient } from './appwrite-client';
import { APPWRITE_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AppwriteRealtime {
  private readonly realtime = new Realtime(inject(AppwriteClient).client);

  tableChannel(tableId: string): string {
    return Channel.tablesdb(APPWRITE_CONFIG.databaseId).table(tableId).row().toString();
  }

  subscribe<T>(channels: string | string[], callback: (event: RealtimeResponseEvent<T>) => void): Promise<RealtimeSubscription> {
    return Array.isArray(channels)
      ? this.realtime.subscribe<T>(channels, callback)
      : this.realtime.subscribe<T>(channels, callback);
  }

  disconnect(): Promise<void> {
    return this.realtime.disconnect();
  }
}
