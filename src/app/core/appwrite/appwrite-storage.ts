import { inject, Injectable } from '@angular/core';
import { ID, Storage, type Models, type UploadProgress } from 'appwrite';

import { AppwriteClient } from './appwrite-client';

@Injectable({
  providedIn: 'root',
})
export class AppwriteStorage {
  private readonly storage = new Storage(inject(AppwriteClient).client);

  uploadFile(
    bucketId: string,
    file: File,
    permissions?: string[],
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<Models.File> {
    return this.storage.createFile({
      bucketId,
      fileId: ID.unique(),
      file,
      permissions,
      onProgress,
    });
  }

  listFiles(bucketId: string, queries: string[] = []): Promise<Models.FileList> {
    return this.storage.listFiles({ bucketId, queries });
  }

  getPreviewUrl(bucketId: string, fileId: string): string {
    return this.storage.getFilePreview({ bucketId, fileId });
  }

  deleteFile(bucketId: string, fileId: string): Promise<{}> {
    return this.storage.deleteFile({ bucketId, fileId });
  }
}
