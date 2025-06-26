import { createSlice } from '@reduxjs/toolkit';
import { fetchDeliveryCities, fetchDeliveryMethodsOfCity } from './operations.js';

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
  filterCities: {
    name: '',
    page: 1,
  },
  deliveryAddress: {
    selectedCity: null,
    warehousesTypes: {
      hasBranch: null,
      hasPostomat: null,
      hasCourier: null,
    },
    selectedMethod: '',
    selectedDepartment: '',
    selectedStreet: '',
    selectedHouseNumber: '',
    selectedApartmentNumber: '',
  },
  loading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: initialState,
  reducers: {
    setFilterCities: (state, action) => {
      state.filterCities.name = action.payload.name;
      state.filterCities.page = action.payload.page;
    },
    setSelectedCity: (state, action) => {
      state.deliveryAddress.selectedCity = action.payload;
    },
    clearWarehousesTypes: (state) => {
      state.deliveryAddress.warehousesTypes = {
        hasBranch: null,
        hasPostomat: null,
        hasCourier: null,
      };
    },
    setSelectedMethod: (state, action) => {
      state.deliveryAddress.selectedMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newCities = action.payload.data;
        const totalCount = action.payload.info.totalCount;
        const currentPage = state.filterCities.page;

        if (currentPage === 1) {
          state.deliveryCities.cities = newCities;
        } else {
          state.deliveryCities.cities = [...state.deliveryCities.cities, ...newCities];
        }

        state.deliveryCities.totalCount = totalCount;
      })
      .addCase(fetchDeliveryCities.rejected, handleRejected)

      .addCase(fetchDeliveryMethodsOfCity.pending, handlePending)
      .addCase(fetchDeliveryMethodsOfCity.fulfilled, (state, action) => {
        state.deliveryAddress.warehousesTypes.hasBranch = action.payload.hasBranch;
        state.deliveryAddress.warehousesTypes.hasPostomat = action.payload.hasPostomat;
        state.deliveryAddress.warehousesTypes.hasCourier = action.payload.hasCourier;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDeliveryMethodsOfCity.rejected, handleRejected);
  },
});

export const { setFilterCities, setSelectedCity, clearWarehousesTypes, setSelectedMethod } = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
