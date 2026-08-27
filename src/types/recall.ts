import { BaseEntity } from './common';

export type RecallStatus = 'INITIATED' | 'INVESTIGATING' | 'NOTIFIED' | 'QUARANTINED' | 'RESOLVED' | 'CLOSED';
export type RecallSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Recall extends BaseEntity {
  batch_id: string;
  initiated_by: string;
  reason: string;
  severity: RecallSeverity;
  status: RecallStatus;
  affected_descendant_count?: number;
  notes?: string;
}
