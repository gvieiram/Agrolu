import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agrolu.xyz/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
