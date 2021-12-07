import { MessageRequest } from '../../dtos/request/MessageRequestDTO';
import { MessageResponse } from '../../dtos/response/MessageResponseDTO';
import api from '../api';

const all = (roomId: number) =>
  api.get<MessageResponse[]>(`rooms/${roomId}/messages`);

const store = (roomId: number, message: MessageRequest) =>
  api.post(`rooms/${roomId}/messages`, message);

const MessageApi = {
  all,
  store,
};

export default MessageApi;
