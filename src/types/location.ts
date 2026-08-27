import { BaseEntity } from './common';

export interface Location extends BaseEntity {
  name: string;
  facility_type: 'FARM' | 'MANDI' | 'WAREHOUSE' | 'PROCESSING_PLANT' | 'DISTRIBUTION_CENTER' | 'RETAIL_STORE';
  address: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  latitude: number;
  longitude: number;
}
