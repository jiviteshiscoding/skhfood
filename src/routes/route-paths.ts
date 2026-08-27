/**
 * Centralized application route constants
 */

export const ROUTE_PATHS = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  PUBLIC_TRACE: '/trace/:batchCode',

  // Protected Core Modules
  DASHBOARD: '/dashboard',
  BATCHES: '/batches',
  BATCH_DETAIL: '/batches/:batchId',
  EVENTS: '/events',
  LINEAGE: '/lineage',
  RECALLS: '/recalls',
  SETTINGS: '/settings',

  // Error Pages
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;

export const buildTraceUrl = (batchCode: string) => `/trace/${encodeURIComponent(batchCode)}`;
export const buildBatchDetailUrl = (batchId: string) => `/batches/${encodeURIComponent(batchId)}`;
