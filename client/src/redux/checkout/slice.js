import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';

const initialState = {
  deliveryAddress: {
    selectedCity: null,
    selectedWarehouse: {
      selectedBranch: null,
      selectedPostomat: null,
    },
    selectedStreet: null,
    buildingUnit: null,
    apartmentUnit: null,
    selectedMethod: '',
  },

  customer: {
    id: null, // userId з бази або null (гість)
    isAuthorized: false,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    emailFromAuth: false, // true, якщо email з бази авторизованих юзерів
  },

  selectedDeliveryCost: null,
  paymentMethod: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.deliveryAddress.selectedCity = action.payload;
    },
    setSelectedMethod: (state, action) => {
      state.deliveryAddress.selectedMethod = action.payload;
    },

    setSelectedBranch: (state, action) => {
      state.deliveryAddress.selectedWarehouse.selectedBranch = action.payload;
    },

    setSelectedPostomat: (state, action) => {
      state.deliveryAddress.selectedWarehouse.selectedPostomat = action.payload;
    },

    setSelectedStreet: (state, action) => {
      state.deliveryAddress.selectedStreet = action.payload;
    },
    setSelectedDeliveryCost: (state, action) => {
      state.selectedDeliveryCost = action.payload
        ? (parseFloat(action.payload.replace(',', '.')) / 41).toFixed(2)
        : null;
    },
    setCustomerField: (state, action) => {
      const { field, value } = action.payload;
      state.customer[field] = value;
    },
    setDeliveryAddressField: (state, action) => {
      const { field, value } = action.payload;
      state.deliveryAddress[field] = value;
    },
    clearDeliveryUnits: (state) => {
      state.deliveryAddress.buildingUnit = null;
      state.deliveryAddress.apartmentUnit = null;
    },
    setCustomerEmailFromAuth: (state, action) => {
      state.customer.emailFromAuth = action.payload;
    },
    // Встановити весь об'єкт customer (використовується при вході юзера)
    setCustomerData: (state, action) => {
      const incomingData = action.payload;

      Object.entries(incomingData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          state.customer[key] = value;
        }
      });

      state.customer.isAuthorized = true;
      state.customer.emailFromAuth = true;
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // Повна очистка після оформлення замовлення
    resetCheckout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const {
  setSelectedCity,
  setSelectedMethod,
  setSelectedBranch,
  setSelectedPostomat,
  setSelectedStreet,
  setSelectedDeliveryCost,
  setCustomerField,
  setDeliveryAddressField,
  setCustomerIsFromAuth,
  setCustomerData,
  resetCheckout,
  clearDeliveryUnits,
  setPaymentMethod,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
