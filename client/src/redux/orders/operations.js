import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance from '../../utils/axiosInterceptor.js';

export const sendOrder = createAsyncThunk('orders/sendOrder', async (newOrder, thunkAPI) => {
  try {
    const response = await instance.post('/order/create', {
      ...newOrder,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId, thunkAPI) => {
  try {
    const response = await instance.get(`/order/${orderId}`);

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const fetchOdersByUserId = createAsyncThunk('orders/getOdersByUserId', async ({ page, perPage }, thunkAPI) => {
  try {
    const response = await instance.get('/order/my-orders', {
      params: {
        page,
        perPage,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});
