interface State {
  id: number;
  name: string;
  initials: string;
}

interface City {
  id: number;
  name: string;
  state_id: number;
  state: State;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  receive_notification: boolean;
  cultivation: number;
  exponent_push_token: string;
  third_party_login: boolean;
  document: string;
  phone: string;
  photo: string | null;
  city_id: number | null;
  city: City | null;
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
