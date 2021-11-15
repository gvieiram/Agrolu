import { CategoryResponse } from '../../dtos/response/CategoryResponseDTO';
import api from '../api';

const all = () => api.get<CategoryResponse[]>('categories');

const CategoryApi = {
  all,
};

export default CategoryApi;
