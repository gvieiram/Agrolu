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
