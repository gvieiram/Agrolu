interface Advertiser {
  id: number;
  name: string;
  verified: boolean;
  created_at: string;
  created_date: string;
  created_time: string;
}

interface AnnouncementCategory {
  id: number;
  name: string;
}

interface AnnouncementType {
  id: number;
  name: string;
  category: AnnouncementCategory;
}

interface AnnouncementTags {
  title: string;
  has: boolean;
}

export interface Image {
  id: number;
  advertisement_id: number;
  url: string;
}

export interface AnnouncementData {
  id: number;
  thumbnail?: string;
  title: string;
  price: number;
  created_date: string;
  created_time: string;
  description: string;
  status?: boolean;
  type: AnnouncementType;
  advertiser: Advertiser;
  first_image?: Image[];
  images?: Image[];
  tags: AnnouncementTags[];
  favorite_exists: boolean;
  owns: boolean;
  turbo: boolean;
}

export interface AnnouncementResponse {
  data: AnnouncementData[];
  next_page_url: string | null;
}
