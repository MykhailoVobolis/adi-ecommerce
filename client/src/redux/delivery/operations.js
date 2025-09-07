import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';
import instance from '../../utils/axiosInterceptor.js';

export const fetchDeliveryCities = createAsyncThunk('delivery/fetchCities', async (filterParams, thunkAPI) => {
  try {
    // Дістаємо значення selectedCity зі state.checkout та передаємо його у state.delivery з відповіддю !!!
    const state = thunkAPI.getState();
    const selectedCity = state.checkout.selectedCity;

    const response = await instance.get('/delivery', {
      params: filterParams,
    });

    return {
      data: response.data.data,
      selectedCity,
    };
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
  const { CityRef, warehouseRef, page = 1, warehouseName = '', CategoryOfWarehouse } = filterParams;
  try {
    const response = await instance.get('/delivery/warehouses', {
      params: {
        CityRef,
        TypeOfWarehouseRef: warehouseRef,
        Page: page,
        FindByString: warehouseName,
        CategoryOfWarehouse,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const fetchDeliveryCost = createAsyncThunk('delivery/fetchDeliveryCost', async (sendingOptions, thunkAPI) => {
  const { cost, cityRecipient, serviceType = 'WarehouseWarehouse', amount } = sendingOptions;
  try {
    const response = await instance.get('/delivery/cost', {
      params: {
        CityRecipient: cityRecipient,
        ServiceType: serviceType,
        Cost: cost,
        SeatsAmount: amount,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const fetchStreetsOfCity = createAsyncThunk('delivery/fetchStreets', async (filterParams, thunkAPI) => {
  try {
    const response = await instance.get('/delivery/streets', {
      params: filterParams,
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
