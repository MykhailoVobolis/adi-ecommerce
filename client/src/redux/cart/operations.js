import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance from '../../utils/axiosInterceptor.js';

export const getUserCart = createAsyncThunk('cart/getUserCart', async (_, thunkAPI) => {
  try {
    const response = await instance.get('/cart');

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});

export const addProductsToCart = createAsyncThunk('cart/addProductToCart', async (products, thunkAPI) => {
  const newProducts = products.map((p) => ({
    productId: p._id,
    quantity: p.quantity,
    selectedColor: p.color,
    selectedSize: p.size,
  }));

  try {
    const response = await instance.put('/cart/update', {
      products: newProducts,
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});

export const changeProductQuantity = createAsyncThunk('cart/changeProductQuantity', async (product, thunkAPI) => {
  try {
    const response = await instance.put('/cart/change-quantity', {
      productId: product._id,
      quantity: product.quantity,
      selectedColor: product.color,
      selectedSize: product.size,
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ status: error.response?.status, message: errorMessage });
  }
});
