interface Image {
  path: string;
}

interface Inspection {
  path: string;
}

export interface AnnouncementRequest {
  title: string;
  price: number;
  description: string;
  images: Image[];
  inspections?: Inspection[];
}

export interface AnnouncementImageRequest {
  images: Image[];
}
