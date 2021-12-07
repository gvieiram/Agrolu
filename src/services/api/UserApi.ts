import {
  ReportRequest,
  ResetMyPasswordRequest,
  UpdateRequest,
} from '../../dtos/request/UserRequestDTO';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import { UserResponse } from '../../dtos/response/UserResponseDTO';
import api from '../api';

const checkDocument = (images: FormData) =>
  api.post('users/me/check-document', images, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });

const update = (data: UpdateRequest) => api.put<UserResponse>('users/me', data);

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

const storeToken = (token: string) =>
  api.post('users/me/token', {
    exponent_push_token: token,
  });

const UserApi = {
  checkDocument,
  update,
  me,
  myAnnouncements,
  myAnnouncementsFavorites,
  storeAnnouncementFavorite,
  deleteAnnouncementFavorite,
  reportAnnouncement,
  resetMyPassword,
  storeToken,
};

export default UserApi;
