import axios from 'axios';

import { ViaCepResponse } from '../dtos/response/ViaCepResponseDTO';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

const viaCepApi = (cep: string) => api.get<ViaCepResponse>(`${cep}/json`);

export default viaCepApi;
