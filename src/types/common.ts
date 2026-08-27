/**
 * Common shared types across all domain entities
 */

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

export type Result<T, E = { message: string; code?: string; details?: unknown }> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
