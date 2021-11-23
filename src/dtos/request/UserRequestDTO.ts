export interface CheckDocumentRequest {
  selfie: string;
  documentFront: string;
  documentBack: string;
}

export interface ReportRequest {
  reason_id: number;
  reason_text?: string;
}

export interface ResetMyPasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateRequest {
  email: string;
  cep: string;
  phone: string;
  city_id: number;
  public_place: string;
  complement: string;
  number: number;
  receive_notification: number;
}
