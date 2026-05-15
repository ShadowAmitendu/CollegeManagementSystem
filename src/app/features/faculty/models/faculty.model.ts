import { type Models } from 'appwrite';

export type FacultyStatus = 'active' | 'inactive';
export type FacultyStatusFilter = 'all' | FacultyStatus;

export interface FacultyMember extends Models.Row {
  readonly userId: string;
  readonly employeeNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly departmentId: string;
  readonly departmentName: string;
  readonly designation: string;
  readonly specialization: string;
  readonly office: string;
  readonly joinedYear: number;
  readonly coursesAssigned: number;
  readonly adviseeCount: number;
  readonly status: FacultyStatus;
  readonly avatarFileId?: string;
}

export type FacultyFormValue = Pick<
  CreateFacultyPayload,
  | 'employeeNumber'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'departmentId'
  | 'departmentName'
  | 'designation'
  | 'specialization'
  | 'office'
  | 'joinedYear'
  | 'coursesAssigned'
  | 'adviseeCount'
  | 'status'
>;

export type CreateFacultyPayload = Omit<FacultyMember, keyof Models.Row>;
export type UpdateFacultyPayload = Partial<CreateFacultyPayload>;
