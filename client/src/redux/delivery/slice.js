import { createSlice } from '@reduxjs/toolkit';
import { fetchDeliveryCities } from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const initialState = {
  deliveryCities: {
    cities: [],
    totalCount: null,
  },
  loading: false,
  error: null,
  filterCities: {
    name: '',
    page: 1,
  },
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryCities.pending, handlePending)
      .addCase(fetchDeliveryCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.deliveryCities.cities = action.payload.data;
        state.deliveryCities.totalCount = action.payload.info.totalCount;
      })
      .addCase(fetchDeliveryCities.rejected, handleRejected);
  },
});

export const deliveryReducer = deliverySlice.reducer;
