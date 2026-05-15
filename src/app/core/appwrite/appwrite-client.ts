import { Injectable } from '@angular/core';
import { Client } from 'appwrite';

import { APPWRITE_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AppwriteClient {
  readonly client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);
}
