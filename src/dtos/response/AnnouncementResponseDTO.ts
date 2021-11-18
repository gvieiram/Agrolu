import { Paginator } from '../PaginatorDTO';

export interface Tag {
  title: string;
  has: boolean;
}

export interface Image {
  id?: number;
  url: string;
  advertisement_id: number;
}

export interface Inspection {
  id?: number;
  url: string;
  advertisement_id: number;
}

interface Announcement {
  id: number;
  title: string;
  turbo: boolean;
  price: number;
  available: boolean;
  created_at: string;
  created_date: string;
  created_time: string;
  tags: Tag[];
  owns: boolean;
  advertiser: Advertiser | null;
  first_image: Image;
  inspections: Inspection[];
}

interface Category {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
  category_id: number;
  category: Category;
}

export interface Advertiser {
  id: number;
  name: string;
  verified?: boolean;
  created_at: string;
  created_date: string;
  created_time: string;
}

export interface AnnouncementsPaginatorResponse extends Paginator {
  data: AnnouncementResponse[];
}

export interface AnnouncementResponse {
  id: number;
  title: string;
  description: string;
  turbo: boolean;
  user_id: number;
  price: string;
  has_operator: boolean;
  last_price: string;
  type_id: number;
  need_transport?: boolean;
  display_phone?: boolean;
  available: boolean;
  created_at: string;
  favorite_exists?: boolean;
  visits?: number;
  created_date: string;
  created_time: string;
  tags: Tag[];
  owns: boolean;
  type?: Type;
  images: Image[];
  first_image?: Image;
  advertiser: Advertiser;
  inspections: Inspection[];
}
