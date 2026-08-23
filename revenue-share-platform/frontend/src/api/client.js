import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    const payload = response?.data?.error;
    const normalized = new Error(payload?.message || error.message || 'The request failed.');
    normalized.code = payload?.code || 'REQUEST_FAILED';
    normalized.details = payload?.details;
    normalized.status = response?.status;
    normalized.requestId = response?.data?.requestId;

    const authRequest = String(error.config?.url || '').includes('/auth/');
    if (response?.status === 401 && !authRequest) {
      window.dispatchEvent(new CustomEvent('reven:session-expired'));
    }
    return Promise.reject(normalized);
  },
);
