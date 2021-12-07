interface Advertisement {
  id: number;
  title: string;
  price: number;
  first_image: FirstImage;
  advertiser: Advertiser;
}

interface FirstImage {
  url: string;
}

interface Advertiser {
  id: number;
  name: string;
}

interface LastMessage {
  id: number;
  name: string;
  created_at: string;
}
export interface Room {
  id: number;
  advertisement?: Advertisement;
  last_message?: LastMessage | null;
}
