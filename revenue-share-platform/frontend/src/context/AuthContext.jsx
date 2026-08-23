import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Establish the server-side session on mount. me() rejects when unauthenticated;
  // that simply means "signed out", not an error to surface.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const current = await authService.me();
        if (active) setUser(current);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const expire = () => setUser(null);
    window.addEventListener('reven:session-expired', expire);
    return () => window.removeEventListener('reven:session-expired', expire);
  }, []);

  const login = async (email, password) => {
    const { user: current } = await authService.login(email, password);
    setUser(current);
    return current;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
