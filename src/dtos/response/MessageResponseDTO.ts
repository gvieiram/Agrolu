export interface MessageResponse {
  id: number;
  room_id?: number;
  user_id?: number;
  message: string;
  created_at: string;
  created_time: string;
}
