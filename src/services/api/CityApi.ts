import { CityResponse } from '../../dtos/response/CityResponseDTO';
import api from '../api';

const find = (id: number) => api.get<CityResponse>(`cities/${id}`);

const CityApi = {
  find,
};

export default CityApi;
