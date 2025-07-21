import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance, { clearAuthHeader, setAuthHeader } from '../../utils/axiosInterceptor.js';
import { setTokens } from './slice.js';

// Перевірка email користувача guest or user
export const checkEmail = createAsyncThunk('auth/checkEmail', async (email, thunkAPI) => {
  try {
    const response = await instance.post('/auth/check-email', { email });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Реєстрація нового користувача
export const register = createAsyncThunk('auth/register', async (newUser, thunkAPI) => {
  try {
    const response = await instance.post('/auth/register', newUser);
    // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Логін користувача
export const logIn = createAsyncThunk('auth/login', async (userInfo, thunkAPI) => {
  try {
    const loginResponse = await instance.post('/auth/login', userInfo);
    // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
    setAuthHeader(loginResponse.data.data.accessToken);

    // Отримання повної інформації про користувача
    const userInfoResponse = await instance.get('/auth/user-info');

    return {
      accessToken: loginResponse.data.data.accessToken,
      refreshToken: loginResponse.data.data.refreshToken,
      data: {
        firstName: userInfoResponse.data.data.userFirstName,
        lastName: userInfoResponse.data.data.userLastName,
        phone: userInfoResponse.data.data.userPhone,
        email: userInfoResponse.data.data.userEmail,
      },
    };
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Вихід користувача
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/auth/logout');
    // Видалення хедеру при виходу користувача з App
    clearAuthHeader();
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Рефреш користувача.
// Збереження данних користувача при перезавантаженні App
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Читання refreshToken з Redux або LocalStorage
    const reduxState = thunkAPI.getState();
    const savedRefreshToken = reduxState.auth.refreshToken;

    // Перевіряємо, чи є refreshToken в Redux
    if (!savedRefreshToken) {
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    try {
      // Надсилаємо запит на сервер для отримання нового accessToken
      const response = await instance.post('/auth/refresh', {
        refreshToken: savedRefreshToken,
      });

      const { accessToken, refreshToken } = response.data.data;

      // Оновлюємо токени в Redux
      thunkAPI.dispatch(setTokens({ accessToken, refreshToken }));

      // Оновлюємо хедер з новим accessToken
      setAuthHeader(accessToken);

      // Повертаємо нові дані користувача після успішного оновлення токенів
      const userResponse = await instance.get('/auth/user-info');
      return userResponse.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
  {
    condition(_, thunkAPI) {
      // Перевіряємо, чи є збережений в LocalStorage refreshToken
      const reduxState = thunkAPI.getState();
      const savedRefreshToken = reduxState.auth.refreshToken;
      return savedRefreshToken !== null;
    },
  },
);
