import React, { createContext, useContext, useState } from 'react';
import { reven } from './api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('reven_session');
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (token, user, tenant) => {
    localStorage.setItem('reven_token', token);
    const s = { user, tenant };
    localStorage.setItem('reven_session', JSON.stringify(s));
    setSession(s);
  };

  const onboard = async (body) => {
    const r = await reven.onboard(body);
    persist(r.token, r.user, r.tenant);
    return r;
  };
  const login = async (body) => {
    const r = await reven.login(body);
    persist(r.token, r.user, { id: r.tenantId });
    return r;
  };
  const logout = () => {
    localStorage.removeItem('reven_token');
    localStorage.removeItem('reven_session');
    setSession(null);
  };

  return (
    <Ctx.Provider value={{ session, isAuthed: !!session, onboard, login, logout }}>
      {children}
    </Ctx.Provider>
  );
};
