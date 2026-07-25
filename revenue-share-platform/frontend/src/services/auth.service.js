import { base44 } from '../api/base44Client';

/** Shape the Base44 user for the UI (name for the shell, _id for keys). */
export const normalizeUser = (u) => {
  if (!u) return u;
  const name =
    u.full_name || u.name || (u.email ? u.email.split('@')[0] : 'User');
  return { ...u, _id: u.id ?? u._id, name, fullName: u.full_name ?? u.fullName };
};

const authService = {
  /**
   * Email/password sign-in for an external Base44 app. The SDK stores the
   * session token internally on success; me() then returns the user.
   */
  login: async (email, password) => {
    await base44.auth.loginViaEmailPassword(email, password);
    const user = normalizeUser(await base44.auth.me());
    return { user };
  },

  /** Redirect-based SSO (Google, etc.) hosted by Base44. */
  loginWithSSO: async () => base44.auth.login(),

  me: async () => normalizeUser(await base44.auth.me()),
  getProfile: async () => normalizeUser(await base44.auth.me()),
  logout: async () => base44.auth.logout(),
};

export default authService;
