export interface Advertiser {
  id: number;
  name: string;
  verified: boolean;
  created_at: string;
}

export interface AnnouncementCategory {
  id: number;
  name: string;
}

export interface AnnouncementType {
  id: number;
  name: string;
  category: AnnouncementCategory;
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
}

export interface AnnouncementResponse {
  data: AnnouncementData[];
}
