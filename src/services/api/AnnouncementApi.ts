import { Params } from '../../dtos/request/AnnouncementRequestDTO';
import {
  AnnouncementResponse,
  AnnouncementsPaginatorResponse,
} from '../../dtos/response/AnnouncementResponseDTO';
import api from '../api';

const all = (params: Params) =>
  api.get<AnnouncementsPaginatorResponse>('advertisements', {
    params,
  });

const find = (id: number) =>
  api.get<AnnouncementResponse>(`advertisements/${id}`);

const store = (announcementData: FormData) =>
  api.post<AnnouncementResponse>('advertisements', announcementData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });

const update = (id: number, announcementData: FormData) =>
  api.put<AnnouncementResponse>(`advertisements/${id}`, announcementData);

const boost = (id: number) => api.post(`advertisements/${id}/boost`);

const storeImage = (id: number, announcementImageData: FormData) =>
  api.post(`advertisements/${id}/images`, announcementImageData);

const deleteImage = (id: number) => api.delete(`images/${id}`);

const AnnouncementApi = {
  all,
  find,
  store,
  update,
  boost,
  storeImage,
  deleteImage,
};

export default AnnouncementApi;
