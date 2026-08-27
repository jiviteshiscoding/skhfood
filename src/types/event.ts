import { BaseEntity } from './common';

export type EventType =
  | 'HARVEST'
  | 'COLLECT'
  | 'MANDI_RECEIVE'
  | 'WAREHOUSE_RECEIVE'
  | 'PROCESS'
  | 'TRANSFORM'
  | 'MERGE'
  | 'SPLIT'
  | 'PACK'
  | 'TRANSFER'
  | 'TRANSPORT_START'
  | 'CHECKPOINT'
  | 'STORAGE'
  | 'QUALITY_CHECK'
  | 'TEMPERATURE_READING'
  | 'RETAIL_RECEIVE'
  | 'SALE'
  | 'QUARANTINE'
  | 'RECALL';

export type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED';

export interface BatchEvent extends BaseEntity {
  batch_id: string;
  actor_id: string;
  actor_name?: string;
  organization_id: string;
  organization_name?: string;
  event_type: EventType;
  location_id?: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
  notes?: string;
  temperature?: number;
  humidity?: number;
  quantity?: number;
  unit?: string;
  previous_event_hash?: string;
  event_hash?: string;
  idempotency_key?: string;
  sync_status: SyncStatus;
}
