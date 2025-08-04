import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance from '../../utils/axiosInterceptor.js';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsBycategory',
  async ({ category, page, perPage }, thunkAPI) => {
    try {
      const response = await instance.get(`/products/${category}`, {
        params: {
          page,
          perPage,
        },
      });

      return {
        category,
        data: response.data.data,
      };
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId, thunkAPI) => {
  try {
    const response = await instance.get(`/products/${productId}`);

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
