import {
  AnnouncementRequest,
  Params,
} from '../../dtos/request/AnnouncementRequestDTO';
import {
  AnnouncementResponse,
  AnnouncementsPaginatorResponse,
} from '../../dtos/response/AnnouncementResponseDTO';
import api from '../api';

const headerFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

const all = (params: Params) =>
  api.get<AnnouncementsPaginatorResponse>('advertisements', {
    params,
  });

const find = (id: number) =>
  api.get<AnnouncementResponse>(`advertisements/${id}`);

const store = (announcementData: FormData) =>
  api.post<AnnouncementResponse>(
    'advertisements',
    announcementData,
    headerFormData,
  );

const update = (id: number, announcementData: AnnouncementRequest) =>
  api.put<AnnouncementResponse>(`advertisements/${id}`, announcementData);

const boost = (id: number) => api.post(`advertisements/${id}/boost`);

const storeImage = (id: number, announcementImageData: FormData) =>
  api.post(
    `advertisements/${id}/images`,
    announcementImageData,
    headerFormData,
  );

const destroyImage = (id: number) => api.delete(`images/${id}`);

const destroy = (id: number) => api.delete(`advertisements/${id}`);

const AnnouncementApi = {
  all,
  find,
  store,
  update,
  boost,
  storeImage,
  destroyImage,
  destroy,
};

export default AnnouncementApi;
