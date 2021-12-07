import { Advertiser, Image, Inspection, Tag } from './AnnouncementResponseDTO';
import { MessageResponse } from './MessageResponseDTO';

interface Announcement {
  id: number;
  title: string;
  price: number;
  user_id: number;
  created_at: string;
  created_date: string;
  created_time: string;
  tags: Tag[];
  owns: boolean;
  first_image: Image;
  advertiser: Advertiser;
  inspections: Inspection[] | null;
}

export interface RoomResponse {
  id: number;
  advertisement_id: number;
  user_id: number;
  advertisement: Announcement;
  title?: string;
  last_message: MessageResponse | null;
}
