export interface ApiFailure {
  readonly ok: false;
  readonly message: string;
  readonly code?: number;
}

export interface ApiSuccess<T> {
  readonly ok: true;
  readonly data: T;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export function success<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function failure(message: string, code?: number): ApiFailure {
  return { ok: false, message, code };
}
