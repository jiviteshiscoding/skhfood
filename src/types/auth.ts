import { BaseEntity } from './common';

export type UserRole =
  | 'FARMER'
  | 'MANDI'
  | 'WAREHOUSE'
  | 'PROCESSOR'
  | 'FACTORY'
  | 'DISTRIBUTOR'
  | 'TRANSPORTER'
  | 'RETAILER'
  | 'AUTHORITY'
  | 'ADMIN';

export type OrganizationType =
  | 'FARM'
  | 'MANDI'
  | 'WAREHOUSE'
  | 'PROCESSOR'
  | 'FACTORY'
  | 'DISTRIBUTOR'
  | 'TRANSPORTER'
  | 'RETAILER'
  | 'AUTHORITY';

export interface Organization extends BaseEntity {
  name: string;
  type: OrganizationType;
  license_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface Profile extends BaseEntity {
  user_id?: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  organization_id?: string;
  organization?: Organization;
  language?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile?: Profile;
}
