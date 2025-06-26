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

export const fetchDeliveryMethodsOfCity = createAsyncThunk(
  'delivery/fetchDeliveryMethods',
  async (filterParams, thunkAPI) => {
    try {
      const response = await instance.get('/delivery/methods', {
        params: {
          CityRef: filterParams,
        },
      });

      return response.data.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const fetchWarehousesOfCity = createAsyncThunk('delivery/fetchWarehouses', async (filterParams, thunkAPI) => {
  const { cityRef, warehouseRef, page = 1, warehouseName = '', CategoryOfWarehouse } = filterParams;
  try {
    const response = await instance.get('/delivery/warehouses', {
      params: {
        CityRef: cityRef,
        TypeOfWarehouseRef: warehouseRef,
        Page: page,
        FindByString: warehouseName,
        CategoryOfWarehouse,
      },
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
