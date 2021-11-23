import { CultivationResponse } from '../../dtos/response/CultivationResponseDTO';
import api from '../api';

const all = () => api.get<CultivationResponse[]>('cultivations');

const CultivationApi = {
  all,
};

export default CultivationApi;
