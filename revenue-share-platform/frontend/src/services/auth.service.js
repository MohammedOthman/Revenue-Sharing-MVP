import { api } from '../api/client';

/** Shape the authenticated user for the UI (name for the shell, _id for keys). */
export const normalizeUser = (u) => {
  if (!u) return u;
  const name =
    u.full_name || u.name || (u.email ? u.email.split('@')[0] : 'User');
  return { ...u, _id: u.id ?? u._id, name, fullName: u.full_name ?? u.fullName };
};

const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return { user: normalizeUser(data.user) };
  },
  me: async () => {
    const { data } = await api.get('/auth/me');
    return normalizeUser(data.user);
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/me');
    return normalizeUser(data.user);
  },
  logout: async () => api.post('/auth/logout'),
  changePassword: async (currentPassword, newPassword) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

export default authService;
