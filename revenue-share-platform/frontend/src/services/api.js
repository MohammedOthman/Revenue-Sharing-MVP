import axios from 'axios';

// Same-origin '/api' works for the single-service deploy and the Vite dev proxy.
// Set VITE_API_URL at build time (e.g. https://api.example.com/api) when the
// frontend and backend are hosted separately.
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

export default api;
