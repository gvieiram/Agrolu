export interface RequestResetPasswordRequest {
  email: string;
}

export interface CheckCodeRequest {
  code: number;
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}
