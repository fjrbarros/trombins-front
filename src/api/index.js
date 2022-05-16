import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/v1/',
});

const token = localStorage.getItem('access_token');

api.interceptors.request.use(config => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.defaults.teste = 'aaaaaaaaaa';

export default api;
