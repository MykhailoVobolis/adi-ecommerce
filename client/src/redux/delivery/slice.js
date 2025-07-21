import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDeliveryCities,
  fetchDeliveryCost,
  fetchDeliveryMethodsOfCity,
  fetchStreetsOfCity,
  fetchWarehousesOfCity,
} from './operations.js';
import { resetAppState } from '../actions/globalActions.js';

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
  streetsOfCity: {
    streets: [],
    totalCount: null,
  },
  filterWarehouses: {
    name: '',
    page: 1,
  },
  filterStreets: {
    name: '',
    page: 1,
  },
  warehousesTypes: {
    hasBranch: null,
    hasPostomat: null,
    hasCourier: null,
  },
  deliveryCost: {
    pickupPointCost: null,
    courierDeliveryCost: null,
    costRedelivery: null,
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
    setFilterWarehouses: (state, action) => {
      const { name, page } = action.payload;
      if (name !== undefined) {
        state.filterWarehouses.name = name;
      }
      if (page !== undefined) {
        state.filterWarehouses.page = page;
      }
    },
    setFilterStreets: (state, action) => {
      const { name, page } = action.payload;
      if (name !== undefined) {
        state.filterStreets.name = name;
      }
      if (page !== undefined) {
        state.filterStreets.page = page;
      }
    },
    clearWarehousesTypes: (state) => {
      state.warehousesTypes = {
        hasBranch: null,
        hasPostomat: null,
        hasCourier: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const currentPage = state.filterCities.page;
        const newCities = action.payload.data.data;
        const totalCount = action.payload.data.info.totalCount;
        const selectedCity = action.payload.selectedCity;

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
        state.warehousesTypes.hasBranch = action.payload.hasBranch;
        state.warehousesTypes.hasPostomat = action.payload.hasPostomat;
        state.warehousesTypes.hasCourier = action.payload.hasCourier;
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

      .addCase(fetchStreetsOfCity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newStreets = action.payload.data;
        const totalCount = action.payload.info.totalCount;
        const currentPage = state.filterStreets.page;

        if (currentPage === 1) {
          state.streetsOfCity.streets = newStreets;
        } else {
          state.streetsOfCity.streets = [...state.streetsOfCity.streets, ...newStreets];
        }

        state.streetsOfCity.totalCount = totalCount;
      })
      .addCase(fetchStreetsOfCity.rejected, handleRejected)

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
      .addCase(fetchDeliveryCost.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { setFilterCities, clearWarehousesTypes, setFilterWarehouses, setFilterStreets } = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
