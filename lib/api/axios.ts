import { getCookie, removeCookie } from '@/utils/cookies';
import axios from 'axios';

const token = getCookie('token');
const axiosInstance = axios.create({
  baseURL: process.env.ENV === 'production' ? process.env.BASE_URL : 'http://localhost:8002',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `token ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => config ,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === 'undefined') return Promise.reject(error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      removeCookie('sid');
      removeCookie('token');
    }

    return Promise.reject(error.response?.data);
  }
);

export { axiosInstance };
