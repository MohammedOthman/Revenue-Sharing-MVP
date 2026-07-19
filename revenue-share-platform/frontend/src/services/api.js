import axios from 'axios';

// Same-origin '/api' by default (dev proxy + production single-origin serve);
// set VITE_API_URL when the API lives on another host.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const isAuthPath = (url = '') => url.includes('/auth/login') || url.includes('/auth/register');

// Expired/invalid session: clear it and land on the login page instead of
// leaving every screen stuck on a generic failure.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    if (status === 401 && !isAuthPath(url) && window.location.pathname !== '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

export const getApiError = (error, fallback = 'Something went wrong') =>
  error?.response?.data?.error || error?.response?.data?.message || fallback;

export default api;
