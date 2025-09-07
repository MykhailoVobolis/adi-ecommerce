import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';

import instance from '../../utils/axiosInterceptor.js';

export const getUserFavorites = createAsyncThunk('favorites/getUserFavorites', async (_, thunkAPI) => {
  try {
    const response = await instance.get('/favorites');

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async (products, thunkAPI) => {
  const newProducts = products.map((p) => ({
    productId: p._id,
    selectedColor: p.selectedColor,
  }));

  try {
    const response = await instance.put('/favorites/add-favorite', {
      products: newProducts,
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async (product, thunkAPI) => {
  try {
    const response = await instance.delete('/favorites/remove-favorite', {
      // Обов'язково передаємо body через ключ `data`! Це правило передавати body у axios.delete.
      data: {
        productId: product._id,
        selectedColor: product.color,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});
