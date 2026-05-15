import { type Models } from 'appwrite';

export interface FacultyMember extends Models.Row {
  readonly userId: string;
  readonly employeeNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly departmentId: string;
  readonly designation: string;
  readonly status: 'active' | 'inactive';
  readonly avatarFileId?: string;
}

export type CreateFacultyPayload = Omit<FacultyMember, keyof Models.Row>;
export type UpdateFacultyPayload = Partial<CreateFacultyPayload>;
