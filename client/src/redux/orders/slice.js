import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';
import { fetchOrderById } from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const initialState = {
  confirmedOrder: {},
  orderslist: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrderById.pending, handlePending)
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.confirmedOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const ordersReducer = ordersSlice.reducer;
