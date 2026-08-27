import { BaseEntity } from './common';
import { Organization } from './auth';

export type BatchStatus =
  | 'HARVESTED'
  | 'COLLECTED'
  | 'RECEIVED'
  | 'PROCESSING'
  | 'PROCESSED'
  | 'PACKED'
  | 'IN_TRANSIT'
  | 'STORED'
  | 'RETAIL'
  | 'SOLD'
  | 'QUARANTINED'
  | 'RECALLED'
  | 'EXPIRED';

export type QualityGrade = 'A' | 'B' | 'C' | 'PREMIUM' | 'STANDARD' | 'ORGANIC';

export interface Product extends BaseEntity {
  name: string;
  category: string;
  description?: string;
  unit: string;
}

export interface Batch extends BaseEntity {
  batch_code: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  unit: string;
  production_date: string;
  harvest_date?: string;
  expiry_date: string;
  organization_id: string;
  organization?: Organization;
  origin_location_id?: string;
  current_location_id?: string;
  current_status: BatchStatus;
  quality_grade?: QualityGrade;
  verification_status: 'PENDING' | 'VERIFIED' | 'FLAGGED';
  created_by?: string;
}
