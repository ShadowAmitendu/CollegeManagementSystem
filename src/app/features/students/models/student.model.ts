import { type Models } from 'appwrite';

export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended';
export type StudentStatusFilter = 'all' | StudentStatus;

export interface Student extends Models.Row {
  readonly userId: string;
  readonly admissionNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly departmentId: string;
  readonly departmentName: string;
  readonly program: string;
  readonly section: string;
  readonly semester: number;
  readonly enrollmentYear: number;
  readonly advisorName: string;
  readonly cgpa: number;
  readonly attendancePercentage: number;
  readonly status: StudentStatus;
  readonly avatarFileId?: string;
}

export type StudentFormValue = Pick<
  CreateStudentPayload,
  | 'admissionNumber'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'departmentId'
  | 'departmentName'
  | 'program'
  | 'section'
  | 'semester'
  | 'enrollmentYear'
  | 'advisorName'
  | 'cgpa'
  | 'attendancePercentage'
  | 'status'
>;

export type CreateStudentPayload = Omit<Student, keyof Models.Row>;
export type UpdateStudentPayload = Partial<CreateStudentPayload>;
