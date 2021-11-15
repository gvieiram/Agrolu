import {
  StateResponse,
  StatesResponse,
} from '../../dtos/response/StateResponseDTO';
import api from '../api';

const all = () => api.get<StatesResponse[]>('states');

const find = (id: number) => api.get<StateResponse>(`states/${id}`);

const StateApi = {
  all,
  find,
};

export default StateApi;
