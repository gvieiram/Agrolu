export interface Params {
  page: number;
  name?: string;
  priceTo?: string;
  priceFrom?: string;
  operator?: boolean;
  transport?: boolean;
  available?: boolean;
  type?: number;
  category?: number;
  inspection?: boolean;
  state?: number;
  city?: number;
}

export interface AnnouncementRequest {
  title: string;
  description: string;
  type_id: string;
  need_transport: string;
  display_phone: string;
  has_operator: string;
  available: string;
  price: string;
}
