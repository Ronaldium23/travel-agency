import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);

  // Restaurar sesión al montar
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser({
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name || decoded.preferred_username,
          roles: decoded.realm_access?.roles || []
        });
      } else {
        // Token expirado, limpiar
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', null, {
        params: { username, password }
      });

      const { access_token, refresh_token, expires_in } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_expires_at', Date.now() + expires_in * 1000);

      setToken(access_token);
      setRefreshToken(refresh_token);

      const decoded = decodeToken(access_token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name || decoded.preferred_username,
        roles: decoded.realm_access?.roles || []
      });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires_at');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return false;

    try {
      const response = await axios.post('/api/auth/refresh', null, {
        params: { refreshToken }
      });

      const { access_token, expires_in } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_expires_at', Date.now() + expires_in * 1000);

      setToken(access_token);

      const decoded = decodeToken(access_token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name || decoded.preferred_username,
        roles: decoded.realm_access?.roles || []
      });

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  }, [refreshToken]);

  const hasRole = useCallback((role) => {
    return user?.roles?.includes(role) || false;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshAccessToken,
        hasRole,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
