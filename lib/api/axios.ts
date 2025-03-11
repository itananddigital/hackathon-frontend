import { removeCookie } from '@/utils/cookies';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.ENV === 'production' ? process.env.BASE_URL : 'http://localhost:8002',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => config ,
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === 'undefined') return Promise.reject(error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear cookies on auth errors
      removeCookie('sid');



    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
