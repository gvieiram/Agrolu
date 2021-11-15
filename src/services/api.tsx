import axios from 'axios';

import {
  AnnouncementRequest,
  AnnouncementImageRequest,
} from '../dtos/request/AnnouncementRequestDTO';
import { MessageRequest } from '../dtos/request/MessageRequestDTO';
import {
  CheckCodeRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
} from '../dtos/request/PasswordRequestDTO';
import { RoomRequest } from '../dtos/request/RoomRequestDTO';
import {
  CheckDocumentRequest,
  ReportRequest,
  ResetMyPasswordRequest,
} from '../dtos/request/UserRequestDTO';
import {
  AnnouncementResponse,
  AnnouncementsPaginatorResponse,
} from '../dtos/response/AnnouncementResponseDTO';
import { CategoryResponse } from '../dtos/response/CategoryResponseDTO';
import { CityResponse } from '../dtos/response/CityResponseDTO';
import { MessageResponse } from '../dtos/response/MessageResponseDTO';
import { PostResponse, PostsResponse } from '../dtos/response/PostResponseDTO';
import { ReasonResponse } from '../dtos/response/ReasonResponseDTO';
import { RoomResponse } from '../dtos/response/RoomResponseDTO';
import {
  StateResponse,
  StatesResponse,
} from '../dtos/response/StateResponseDTO';
import { UserResponse } from '../dtos/response/UserResponseDTO';

const api = axios.create({
  baseURL: 'https://agrolu.xyz/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const announcements = () =>
  api
    .get<AnnouncementsPaginatorResponse>('advertisements')
    .then(response => response.data)
    .catch(error => error.response.data);

export const announcement = (id: number) =>
  api
    .get<AnnouncementResponse>(`advertisements/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const storeAnnouncement = (announcementData: AnnouncementRequest) =>
  api
    .post<AnnouncementResponse>('advertisements', announcementData)
    .then(response => response.data)
    .catch(error => error.response.data);

export const updateAnnouncement = (
  id: number,
  announcementData: AnnouncementRequest,
) =>
  api
    .put<AnnouncementResponse>(`advertisements/${id}`, announcementData)
    .then(response => response.data)
    .catch(error => error.response.data);

export const boostAnnouncement = (id: number) =>
  api
    .post(`advertisements/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const storeImageAnnouncement = (
  id: number,
  announcementImageData: AnnouncementImageRequest,
) =>
  api
    .post(`advertisements/${id}/images`, announcementImageData)
    .then(response => response.data)
    .catch(error => error.response.data);

export const deleteImageAnnouncement = (id: number) =>
  api
    .delete(`images/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const rooms = () =>
  api
    .get<RoomResponse[]>('rooms')
    .then(response => response.data)
    .catch(error => error.response.data);

export const storeRoom = (roomData: RoomRequest) =>
  api
    .post<RoomResponse[]>('rooms', roomData)
    .then(response => response.data)
    .catch(error => error.response.data);

export const messages = (id: number) =>
  api
    .get<MessageResponse[]>(`rooms/${id}/messages`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const storeMessage = (roomId: number, message: MessageRequest) =>
  api
    .post(`rooms/${roomId}/messages`, message)
    .then(response => response.data)
    .catch(error => error.response.data);

export const categories = () =>
  api
    .get<CategoryResponse[]>('categories')
    .then(response => response.data)
    .catch(error => error.response.data);

export const checkDocument = (images: CheckDocumentRequest) =>
  api
    .post('users/me/check-document', images)
    .then(response => response.data)
    .catch(error => error.response.data);

export const me = () =>
  api
    .get<UserResponse>('users/me')
    .then(response => response.data)
    .catch(error => error.response.data);

export const myAnnouncements = () =>
  api
    .get<AnnouncementResponse[]>('users/me/advertisements')
    .then(response => response.data)
    .catch(error => error.response.data);

export const myAnnouncementsFavorites = () =>
  api
    .get<AnnouncementResponse[]>('users/me/advertisements/favorites')
    .then(response => response.data)
    .catch(error => error.response.data);

export const storeAnnouncementFavorite = (id: number) =>
  api
    .post(`users/me/advertisements/${id}/favorites`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const deleteAnnouncementFavorite = (id: number) =>
  api
    .delete(`users/me/advertisements/${id}/favorites`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const reportAnnouncement = (id: number, report: ReportRequest) =>
  api
    .post(`users/me/advertisements/${id}/favorites`, report)
    .then(response => response.data)
    .catch(error => error.response.data);

export const resetMyPassword = (data: ResetMyPasswordRequest) =>
  api
    .post('users/me/reset-password', data)
    .then(response => response.data)
    .catch(error => error.response.data);

export const requestResetPassword = (data: RequestResetPasswordRequest) =>
  api
    .post('passwords/reset/request', data)
    .then(response => response.data)
    .catch(error => error.response.data);

export const checkCode = (data: CheckCodeRequest) =>
  api
    .post<{ email: string }>('passwords/reset/check-code', data)
    .then(response => response.data)
    .catch(error => error.response.data);

export const resetPassword = (data: ResetPasswordRequest) =>
  api
    .post('passwords/reset', data)
    .then(response => response.data)
    .catch(error => error.response.data);

export const states = () =>
  api
    .get<StatesResponse>('states')
    .then(response => response.data)
    .catch(error => error.response.data);

export const state = (id: number) =>
  api
    .get<StateResponse>(`states/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const city = (id: number) =>
  api
    .get<CityResponse>(`cities/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export const reasons = () =>
  api
    .get<ReasonResponse[]>('reasons')
    .then(response => response.data)
    .catch(error => error.response.data);

export const posts = () =>
  api
    .get<PostsResponse>('posts')
    .then(response => response.data)
    .catch(error => error.response.data);

export const post = (id: number) =>
  api
    .get<PostResponse>(`posts/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

export default api;
