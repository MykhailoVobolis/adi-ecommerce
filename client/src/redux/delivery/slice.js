import { createSlice } from '@reduxjs/toolkit';
import { fetchDeliveryCities, fetchWarehousesOfCity } from './operations.js';

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
  deliveryAddress: {
    selectedCity: null,
    warehousesTypes: {
      hasBranch: null,
      hasPostomat: null,
      hasCourier: null,
    },
    selectedDepartment: '',
    selectedStreet: '',
    selectedHouseNumber: '',
    selectedApartmentNumber: '',
  },
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
    clearWarehousesTypes: (state, action) => {
      state.deliveryAddress.warehousesTypes = {
        hasBranch: null,
        hasPostomat: null,
        hasCourier: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryCities.pending, handlePending)
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

      .addCase(fetchWarehousesOfCity.pending, handlePending)
      .addCase(fetchWarehousesOfCity.fulfilled, (state, action) => {
        state.deliveryAddress.warehousesTypes.hasBranch = action.payload.hasBranch;
        state.deliveryAddress.warehousesTypes.hasPostomat = action.payload.hasPostomat;
        state.deliveryAddress.warehousesTypes.hasCourier = action.payload.hasCourier;
      })
      .addCase(fetchWarehousesOfCity.rejected, handleRejected);
  },
});

export const { setFilterCities, setSelectedCity, clearWarehousesTypes } = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
