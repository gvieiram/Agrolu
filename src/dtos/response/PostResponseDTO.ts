import { Paginator } from '../PaginatorDTO';

export interface PostsResponse extends Paginator {
  data: PostResponse[];
}

export interface PostResponse {
  id: number;
  title: string;
  text: string;
  reference: string;
  thumbnail: string;
  created_date: string;
}
