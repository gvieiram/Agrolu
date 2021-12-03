export interface RequestResetPasswordRequest {
  email: string;
}

export interface CheckCodeRequest {
  code: string;
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  code: string;
}
