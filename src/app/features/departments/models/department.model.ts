import { type Models } from 'appwrite';

export interface Department extends Models.Row {
  readonly code: string;
  readonly name: string;
  readonly hodFacultyId?: string;
  readonly status: 'active' | 'inactive';
}

export type CreateDepartmentPayload = Omit<Department, keyof Models.Row>;
export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>;
