interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Paginator {
  current_page: number;
  data: any;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
