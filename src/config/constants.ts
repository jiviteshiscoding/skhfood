/**
 * System-wide constants, status mappings, and default values
 */

export const APP_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  FARMER: 'Farmer / Producer',
  MANDI: 'Mandi / Aggregator',
  WAREHOUSE: 'Warehouse / Storage',
  PROCESSOR: 'Food Processor',
  FACTORY: 'Manufacturing Factory',
  DISTRIBUTOR: 'Distributor',
  TRANSPORTER: 'Transporter / Logistics',
  RETAILER: 'Retailer / Store',
  AUTHORITY: 'Safety Authority (FSSAI)',
  ADMIN: 'System Administrator',
};

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  HARVESTED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  COLLECTED: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  RECEIVED: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  PROCESSING: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  PROCESSED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  PACKED: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  IN_TRANSIT: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  STORED: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
  RETAIL: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  SOLD: { bg: 'bg-zinc-100', text: 'text-zinc-700', border: 'border-zinc-300' },
  QUARANTINED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  RECALLED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  EXPIRED: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
};
