import axios from 'axios';

// import { refreshUser } from '../redux/auth/operations.js';
// import { clearTokens } from '../redux/auth/slice.js';
// import { store } from '../redux/store.js';

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
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const result = await store.dispatch(refreshUser());

//         if (result.payload.accessToken) {
//           setAuthHeader(result.payload.accessToken);
//           originalRequest.headers['Authorization'] = `Bearer ${result.payload.accessToken}`;
//           return instance(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh token', refreshError);
//         store.dispatch(clearTokens());
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default instance;
