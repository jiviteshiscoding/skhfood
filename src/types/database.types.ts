import { Profile, Organization, OrganizationMember } from './auth';
import { Product, Batch } from './batch';
import { BatchEvent } from './event';
import { BatchLineage } from './lineage';
import { Recall } from './recall';
import { Location } from './location';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, 'id' | 'created_at'>;
        Update: Partial<Omit<Organization, 'id' | 'created_at'>>;
      };
      organization_members: {
        Row: OrganizationMember;
        Insert: Omit<OrganizationMember, 'id' | 'created_at'>;
        Update: Partial<Omit<OrganizationMember, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      batches: {
        Row: Batch;
        Insert: Omit<Batch, 'id' | 'created_at'>;
        Update: Partial<Omit<Batch, 'id' | 'created_at'>>;
      };
      batch_events: {
        Row: BatchEvent;
        Insert: Omit<BatchEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<BatchEvent, 'id' | 'created_at'>>;
      };
      batch_lineage: {
        Row: BatchLineage;
        Insert: Omit<BatchLineage, 'id' | 'created_at'>;
        Update: Partial<Omit<BatchLineage, 'id' | 'created_at'>>;
      };
      recalls: {
        Row: Recall;
        Insert: Omit<Recall, 'id' | 'created_at'>;
        Update: Partial<Omit<Recall, 'id' | 'created_at'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at'>>;
      };
    };
  };
}
