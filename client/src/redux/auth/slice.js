import { createSlice } from '@reduxjs/toolkit';
import { checkEmail, confirmGoogleAuth, logIn, logOut, refreshUser, register, updateUser } from './operations.js';
import { resetAppState } from '../actions/globalActions.js';

const handlePending = (state) => {
  state.loading = true;
  state.authProcess = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
  state.authProcess = false;
};

const initialState = {
  user: {
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
  },
  emailAvailable: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  wasRefreshed: false,
  loading: false,
  authProcess: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    finishAuthProcess(state) {
      state.authProcess = false; // Завершення перевірки сесії
    },
    clearEmailAvailable(state) {
      state.emailAvailable = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Обробка операції перевірки email
      .addCase(checkEmail.pending, handlePending)
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.emailAvailable = action.payload.available;
      })
      .addCase(checkEmail.rejected, handleRejected)

      // Обробка операції регістрації користувача
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.authProcess = false;
        state.wasRefreshed = false;
      })
      .addCase(register.rejected, handleRejected)

      // Обробка операції логіну користувача
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.authProcess = false;
        state.wasRefreshed = false;
      })
      .addCase(logIn.rejected, handleRejected)

      // Обробка операції Google OAuth 2.0 логіну користувача
      .addCase(confirmGoogleAuth.pending, handlePending)
      .addCase(confirmGoogleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.authProcess = false;
        state.wasRefreshed = false;
      })
      .addCase(confirmGoogleAuth.rejected, handleRejected)

      // Обробка операції логауту (вихода користувача з облікового запису App)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = {
          email: null,
          firstName: null,
          lastName: null,
          phone: null,
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.authProcess = false;
        state.wasRefreshed = false;
      })
      .addCase(logOut.rejected, handleRejected)

      // Обробка операції рефрешу користувача
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.loading = false;
        state.isRefreshing = false;
        state.authProcess = false;
        state.wasRefreshed = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.authProcess = false;
      })

      // Обробка операції оновлення даних користувача

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { setTokens, clearTokens, finishAuthProcess, clearEmailAvailable } = authSlice.actions;
export const authReduser = authSlice.reducer;
