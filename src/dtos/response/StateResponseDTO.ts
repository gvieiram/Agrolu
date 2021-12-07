import { CityResponse } from './CityResponseDTO';

export interface StatesResponse {
  id: number;
  name: string;
  initials: string;
}

export interface StateResponse {
  id: number;
  name: string;
  initials: string;
  cities: CityResponse[];
}
