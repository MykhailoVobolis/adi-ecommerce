import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDeliveryCities,
  fetchDeliveryCost,
  fetchDeliveryMethodsOfCity,
  fetchWarehousesOfCity,
} from './operations.js';

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
  deliveryCost: {
    pickupPointCost: null,
    courierDeliveryCost: null,
    costRedelivery: null,
    selectedDeliveryCost: null,
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
      const { name, page } = action.payload;
      if (name !== undefined) {
        state.filterWarehouses.name = name;
      }
      if (page !== undefined) {
        state.filterWarehouses.page = page;
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
    setSelectedDeliveryCost: (state, action) => {
      state.deliveryCost.selectedDeliveryCost = action.payload
        ? (parseFloat(action.payload.replace(',', '.')) / 41).toFixed(2)
        : null;
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
      .addCase(fetchWarehousesOfCity.rejected, handleRejected)

      .addCase(fetchDeliveryCost.fulfilled, (state, action) => {
        if (action.payload.deliveryCost.success) {
          const deliveryType = action.payload.serviceType;
          const costData = action.payload.deliveryCost.data[0];

          const format = (value) => (typeof value === 'number' ? value.toFixed(2).replace('.', ',') : '0,00');

          if (deliveryType === 'WarehouseWarehouse') {
            state.deliveryCost.pickupPointCost = format(costData.Cost);
          }

          if (deliveryType === 'WarehouseDoors') {
            state.deliveryCost.courierDeliveryCost = format(costData.Cost);
          }

          state.deliveryCost.costRedelivery = format(costData.CostRedelivery);
        }
      })
      .addCase(fetchDeliveryCost.rejected, handleRejected);
  },
});

export const {
  setFilterCities,
  setSelectedCity,
  clearWarehousesTypes,
  setSelectedMethod,
  setSelectedWarehouse,
  setFilterWarehouses,
  setSelectedDeliveryCost,
} = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
