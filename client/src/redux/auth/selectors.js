export const selectLoading = (state) => state.auth.loading;

export const selectEmailAvailable = (state) => state.auth.emailAvailable;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectAuthProcess = (state) => state.auth.authProcess;
