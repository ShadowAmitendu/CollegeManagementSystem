import { type Models } from 'appwrite';

export interface Result extends Models.Row {
  readonly studentId: string;
  readonly courseOfferingId: string;
  readonly examType: string;
  readonly marksObtained: number;
  readonly maximumMarks: number;
  readonly grade?: string;
  readonly publishedAt?: string;
}

export type CreateResultPayload = Omit<Result, keyof Models.Row>;
export type UpdateResultPayload = Partial<CreateResultPayload>;
