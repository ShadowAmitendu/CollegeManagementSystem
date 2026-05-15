import { type Models } from 'appwrite';

export type DepartmentStatus = 'active' | 'inactive';
export type DepartmentStatusFilter = 'all' | DepartmentStatus;

export interface Department extends Models.Row {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly hodFacultyId?: string;
  readonly hodName: string;
  readonly building: string;
  readonly programs: readonly string[];
  readonly studentCount: number;
  readonly facultyCount: number;
  readonly activeCourses: number;
  readonly status: DepartmentStatus;
}

export type CreateDepartmentPayload = Omit<Department, keyof Models.Row>;
export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>;
