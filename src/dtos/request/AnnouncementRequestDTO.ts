export interface Params {
  page: number;
  name?: string;
  price?: number;
  operator?: boolean;
  transport?: boolean;
  available?: boolean;
  type?: number;
  category?: number;
  inspection?: boolean;
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
