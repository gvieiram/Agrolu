export interface UserResponse {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  receive_notification: boolean;
  third_party_login: boolean;
  document: string;
  phone: string;
  photo: string | null;
  city_id: number | null;
  cep: string | null;
  public_place: string | null;
  complement: string | null;
  number: number | null;
  online: boolean;
  code: number | null;
  created_at: string;
  updated_at: string;
  created_date: string;
  created_time: string;
}
