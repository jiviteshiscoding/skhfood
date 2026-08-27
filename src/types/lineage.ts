import { BaseEntity } from './common';

export type LineageOperation = 'MERGE' | 'SPLIT' | 'TRANSFORM' | 'REPACK';

export interface BatchLineage extends BaseEntity {
  parent_batch_id: string;
  child_batch_id: string;
  operation_type: LineageOperation;
  quantity_transferred?: number;
  unit?: string;
  created_by?: string;
}

export interface TraceGraphNode {
  id: string;
  label: string;
  batchCode: string;
  productName: string;
  organizationName: string;
  status: string;
  date: string;
  quantity: number;
  unit: string;
  type: 'origin' | 'transit' | 'processor' | 'retail' | 'consumer';
}

export interface TraceGraphEdge {
  id: string;
  source: string;
  target: string;
  operation: LineageOperation;
  quantity?: number;
  unit?: string;
}

export interface CompleteTraceData {
  rootBatch: string;
  nodes: TraceGraphNode[];
  edges: TraceGraphEdge[];
}
