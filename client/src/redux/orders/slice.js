import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';
import { fetchOdersByUserId, fetchOrderById } from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const initialState = {
  confirmedOrder: {},
  userOrders: [],
  pagination: { hasNextPage: null, hasPreviousPage: null, page: 1, perPage: 8, totalItems: null, totalPages: null },
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    setNewPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrderById.pending, handlePending)
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.confirmedOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, handleRejected)

      .addCase(fetchOdersByUserId.pending, handlePending)
      .addCase(fetchOdersByUserId.fulfilled, (state, action) => {
        const { data, hasNextPage, hasPreviousPage, page, perPage, totalItems, totalPages } = action.payload;

        state.pagination = { hasNextPage, hasPreviousPage, page, perPage, totalItems, totalPages };
        state.userOrders = data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOdersByUserId.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { setNewPage } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
