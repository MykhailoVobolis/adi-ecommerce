import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance from '../../utils/axiosInterceptor.js';

export const fetchDeliveryCities = createAsyncThunk('delivery/fetchCities', async (filterParams, thunkAPI) => {
  try {
    const response = await instance.get('/delivery', {
      params: filterParams,
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
