import axios from 'axios';
import { AuthContext } from './context/AuthContext';

// Configuración base
axios.defaults.baseURL = process.env.VITE_API_URL || 'http://localhost:8090';
axios.defaults.headers.common['Content-Type'] = 'application/json';

let authContext = null;

export const setAuthContext = (context) => {
  authContext = context;
};

// Interceptor de solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no es un reintenso, intenta refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry && authContext) {
      originalRequest._retry = true;

      try {
        const success = await authContext.refreshAccessToken();
        if (success) {
          const newToken = localStorage.getItem('access_token');
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        authContext.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Si sigue siendo 401, redirigir a login
    if (error.response?.status === 401) {
      if (authContext) authContext.logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axios;
