import { RoomRequest } from '../../dtos/request/RoomRequestDTO';
import { RoomResponse } from '../../dtos/response/RoomResponseDTO';
import api from '../api';

const all = () => api.get<RoomResponse[]>('rooms');

const store = (roomData: RoomRequest) =>
  api.post<RoomResponse>('rooms', roomData);

const RoomApi = {
  all,
  store,
};

export default RoomApi;
