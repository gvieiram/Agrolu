import {
  CheckDocumentRequest,
  ReportRequest,
  ResetMyPasswordRequest,
} from '../../dtos/request/UserRequestDTO';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import { UserResponse } from '../../dtos/response/UserResponseDTO';
import api from '../api';

const checkDocument = (images: CheckDocumentRequest) =>
  api.post('users/me/check-document', images);

const me = () => api.get<UserResponse>('users/me');

const myAnnouncements = () =>
  api.get<AnnouncementResponse[]>('users/me/advertisements');

const myAnnouncementsFavorites = () =>
  api.get<AnnouncementResponse[]>('users/me/advertisements/favorites');

const storeAnnouncementFavorite = (id: number) =>
  api.post(`users/me/advertisements/${id}/favorites`);

const deleteAnnouncementFavorite = (id: number) =>
  api.delete(`users/me/advertisements/${id}/favorites`);

const reportAnnouncement = (id: number, report: ReportRequest) =>
  api.post(`users/me/advertisements/${id}/favorites`, report);

const resetMyPassword = (data: ResetMyPasswordRequest) =>
  api.post('users/me/reset-password', data);

const UserApi = {
  checkDocument,
  me,
  myAnnouncements,
  myAnnouncementsFavorites,
  storeAnnouncementFavorite,
  deleteAnnouncementFavorite,
  reportAnnouncement,
  resetMyPassword,
};

export default UserApi;
