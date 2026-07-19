import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  checkResetToken: async (token) => {
    const response = await api.get(`/auth/reset-token/${token}`);
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  // Admin team management
  inviteUser: async ({ email, fullName, role }) => {
    const response = await api.post('/auth/invite', { email, fullName, role });
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get('/auth/users');
    return response.data.users;
  },

  updateUser: async (id, updates) => {
    const response = await api.put(`/auth/users/${id}`, updates);
    return response.data.user;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/auth/users/${id}`);
    return response.data;
  },
};

export default authService;
