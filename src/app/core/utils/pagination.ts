export interface PageRequest {
  readonly page: number;
  readonly limit: number;
}

export interface PageResult<T> {
  readonly rows: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

export const DEFAULT_PAGE_SIZE = 20;

export function offsetForPage({ page, limit }: PageRequest): number {
  return Math.max(page - 1, 0) * limit;
}
