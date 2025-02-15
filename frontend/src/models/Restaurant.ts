export interface Restaurant {
  id: string;
  name: string;
  delivery_fee: number;
  min_order: number;
  rating: number;
  order_count: number;
  owner_id: string;
  logo_url?: string;
  background_url?: string;
  [key: string]: unknown;
}
