import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_BACKEND_PROD_HOST :
    process.env.REACT_APP_BACKEND_DEV_HOST,
  timeout: 1000,
});

const USER_APP_ACCESS_TOKEN = 'user-app-secret-key';

api.interceptors.request.use((config) => {
  config.headers.Authorization = `My-Token ${USER_APP_ACCESS_TOKEN}`;

  return config;
});

export default api;
