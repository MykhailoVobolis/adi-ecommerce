import axios from 'axios';
import { refreshUser } from '../redux/auth/operations.js';
import { clearTokens } from '../redux/auth/slice.js';
import { getStore } from './refreshHandler.js';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// Установка заголовка авторизації
export const setAuthHeader = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Очищення заголовка авторизації
export const clearAuthHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

// Інтерсептор для обробки відповіді
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // захист від зациклення

      try {
        const result = await getStore().dispatch(refreshUser());
        if (result.payload.accessToken) {
          // Оновлюємо токен
          const newAccessToken = result.payload.accessToken;
          setAuthHeader(newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token', refreshError);
        getStore().dispatch(clearTokens());
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
