import { createSlice } from '@reduxjs/toolkit';
import { fetchDeliveryCities, fetchDeliveryMethodsOfCity, fetchWarehousesOfCity } from './operations.js';

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
  warehousesOfCity: {
    warehouses: [],
    totalCount: null,
  },
  filterWarehouses: {
    name: '',
    page: 1,
    category: '',
  },
  deliveryAddress: {
    selectedCity: null,
    selectedWarehouse: null,
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
    setFilterWarehouses: (state, action) => {
      const { name, page, category } = action.payload;
      if (name !== undefined) {
        state.filterWarehouses.name = name;
      }
      if (page !== undefined) {
        state.filterWarehouses.page = page;
      }
      if (category !== undefined) {
        state.filterWarehouses.category = category;
      }
    },
    setSelectedWarehouse: (state, action) => {
      state.deliveryAddress.selectedWarehouse = action.payload;
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
        const selectedCity = state.deliveryAddress.selectedCity;

        if (currentPage === 1 || selectedCity) {
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
      .addCase(fetchDeliveryMethodsOfCity.rejected, handleRejected)

      .addCase(fetchWarehousesOfCity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newWarehouses = action.payload.data;
        const totalCount = action.payload.meta.totalCount;
        const currentPage = state.filterWarehouses.page;

        if (currentPage === 1) {
          state.warehousesOfCity.warehouses = newWarehouses;
        } else {
          state.warehousesOfCity.warehouses = [...state.warehousesOfCity.warehouses, ...newWarehouses];
        }

        state.warehousesOfCity.totalCount = totalCount;
      })
      .addCase(fetchWarehousesOfCity.rejected, handleRejected);
  },
});

export const {
  setFilterCities,
  setSelectedCity,
  clearWarehousesTypes,
  setSelectedMethod,
  setSelectedWarehouse,
  setFilterWarehouses,
} = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
