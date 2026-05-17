import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { Permissions } from '../../../../core/services/permissions';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-import-students',
  imports: [DecimalPipe, RouterLink, RouterLinkActive],
  templateUrl: './import-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ImportStudents {
  private readonly permissions = inject(Permissions);
  
  protected readonly canImport = computed(() => this.permissions.can('students.create') || this.permissions.can('students.manage'));

  protected isDragging = signal(false);
  protected selectedFile = signal<File | null>(null);
  protected isUploading = signal(false);
  protected uploadSuccess = signal(false);

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files?.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      this.selectedFile.set(file);
      this.uploadSuccess.set(false);
    } else {
      alert('Please upload a valid CSV file.');
    }
  }

  protected clearFile(): void {
    this.selectedFile.set(null);
    this.uploadSuccess.set(false);
  }

  protected async uploadFile(): Promise<void> {
    const file = this.selectedFile();
    if (!file || !this.canImport()) return;

    this.isUploading.set(true);
    
    // Simulate Appwrite File Upload & Processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.isUploading.set(false);
    this.uploadSuccess.set(true);
    this.selectedFile.set(null);
  }
}
