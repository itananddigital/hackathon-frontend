import { getCookie, removeCookie } from '@/utils/cookies';
import axios from 'axios';
import { CONSTANTS } from './app-config';

const axiosInstance = axios.create({
  baseURL: CONSTANTS.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `token ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401 || error.response?.status === 403) {
      removeCookie('sid');
      removeCookie('token');
    }

    return Promise.reject(error.response.data);
  }
);

export { axiosInstance };
