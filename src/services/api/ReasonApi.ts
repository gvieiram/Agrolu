import { ReasonResponse } from '../../dtos/response/ReasonResponseDTO';
import api from '../api';

const all = () => api.get<ReasonResponse[]>('reasons');

const ReasonApi = {
  all,
};

export default ReasonApi;
