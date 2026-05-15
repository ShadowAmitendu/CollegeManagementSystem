import { type Models } from 'appwrite';

export type ResultStatus = 'draft' | 'published' | 'locked';
export type ResultStatusFilter = 'all' | ResultStatus;
export type ResultExamType = 'internal' | 'midterm' | 'practical' | 'final';

export interface Result extends Models.Row {
  readonly studentId: string;
  readonly studentName: string;
  readonly rollNumber: string;
  readonly courseOfferingId: string;
  readonly courseCode: string;
  readonly courseTitle: string;
  readonly departmentName: string;
  readonly semester: number;
  readonly examType: ResultExamType;
  readonly marksObtained: number;
  readonly maximumMarks: number;
  readonly grade: string;
  readonly gradePoint: number;
  readonly evaluatorName: string;
  readonly status: ResultStatus;
  readonly publishedAt?: string;
  readonly remarks?: string;
}

export interface ResultSummary {
  readonly total: number;
  readonly published: number;
  readonly draft: number;
  readonly locked: number;
  readonly averagePercentage: number;
  readonly passCount: number;
}

export type CreateResultPayload = Omit<Result, keyof Models.Row>;
export type UpdateResultPayload = Partial<CreateResultPayload>;
