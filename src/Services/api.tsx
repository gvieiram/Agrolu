import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.131.152.29/api',
});

export default api;
