import {
  AnnouncementImageRequest,
  AnnouncementRequest,
} from '../../dtos/request/AnnouncementRequestDTO';
import {
  AnnouncementResponse,
  AnnouncementsPaginatorResponse,
} from '../../dtos/response/AnnouncementResponseDTO';
import api from '../api';

const all = () => api.get<AnnouncementsPaginatorResponse>('advertisements');

const find = (id: number) =>
  api.get<AnnouncementResponse>(`advertisements/${id}`);

const store = (announcementData: AnnouncementRequest) =>
  api.post<AnnouncementResponse>('advertisements', announcementData);

const update = (id: number, announcementData: AnnouncementRequest) =>
  api.put<AnnouncementResponse>(`advertisements/${id}`, announcementData);

const boost = (id: number) => api.post(`advertisements/${id}/boost`);

const storeImage = (
  id: number,
  announcementImageData: AnnouncementImageRequest,
) => api.post(`advertisements/${id}/images`, announcementImageData);

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
