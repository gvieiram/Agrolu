import {
  CheckCodeRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
} from '../../dtos/request/PasswordRequestDTO';
import api from '../api';

const requestResetPassword = (data: RequestResetPasswordRequest) =>
  api.post('passwords/reset/request', data);

const checkCode = (data: CheckCodeRequest) =>
  api.post<{ email: string }>('passwords/reset/check-code', data);

const resetPassword = (data: ResetPasswordRequest) =>
  api.post('passwords/reset', data);

const PasswordApi = {
  requestResetPassword,
  checkCode,
  resetPassword,
};

export default PasswordApi;
