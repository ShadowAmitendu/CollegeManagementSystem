import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { Permissions } from '../../../../core/services/permissions';
import { RouterLink } from '@angular/router';
import { Students } from '../../services/students';
import { StudentFormValue } from '../../models/student.model';

@Component({
  selector: 'app-import-students',
  imports: [DecimalPipe],
  templateUrl: './import-students.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ImportStudents {
  private readonly permissions = inject(Permissions);
  private readonly studentsService = inject(Students);
  
  protected readonly canImport = computed(() => 
    this.permissions.can('students.create') || 
    this.permissions.can('students.manage') ||
    this.permissions.hasAnyRole(['admin', 'principal', 'hod', 'professor'])
  );

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
    
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = line.split(',').map(v => v.trim());
        const studentData: any = {};
        headers.forEach((header, index) => {
          studentData[header] = values[index];
        });
        
        if (studentData.semester) studentData.semester = parseInt(studentData.semester, 10);
        if (studentData.enrollmentYear) studentData.enrollmentYear = parseInt(studentData.enrollmentYear, 10);
        
        studentData.cgpa = 0;
        studentData.attendancePercentage = 0;
        studentData.status = 'active';

        await this.studentsService.createStudent(studentData as StudentFormValue);
      }
      
      this.uploadSuccess.set(true);
      this.selectedFile.set(null);
    } catch (error) {
      console.error('Failed to import students', error);
      alert('Failed to import students. Please check the file format.');
    } finally {
      this.isUploading.set(false);
    }
  }
}
