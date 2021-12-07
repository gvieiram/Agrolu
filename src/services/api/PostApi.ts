import { PostResponse } from '../../dtos/response/PostResponseDTO';
import api from '../api';

const all = () => api.get<PostResponse[]>('posts');

const find = (id: number) => api.get<PostResponse>(`posts/${id}`);

const PostApi = {
  all,
  find,
};

export default PostApi;
