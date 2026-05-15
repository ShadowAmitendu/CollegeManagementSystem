import { type Models } from 'appwrite';

export interface Student extends Models.Row {
  readonly userId: string;
  readonly admissionNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly departmentId: string;
  readonly semester: number;
  readonly status: 'active' | 'inactive' | 'graduated' | 'suspended';
  readonly avatarFileId?: string;
}

export type CreateStudentPayload = Omit<Student, keyof Models.Row>;
export type UpdateStudentPayload = Partial<CreateStudentPayload>;
