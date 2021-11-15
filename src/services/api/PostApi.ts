import {
  PostResponse,
  PostsResponse,
} from '../../dtos/response/PostResponseDTO';
import api from '../api';

const all = () => api.get<PostsResponse>('posts');

const find = (id: number) => api.get<PostResponse>(`posts/${id}`);

const PostApi = {
  all,
  find,
};

export default PostApi;
