import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';

const initialState = {
  cartData: {
    products: [],
    totalPrice: 0,
    totalQuantityProducts: 0,
  },
  loading: false,
  error: null,
};

const recalculateCartTotals = (state) => {
  const products = state.cartData.products;

  state.cartData.totalQuantityProducts = products.reduce((total, item) => total + item.quantity, 0);
  state.cartData.totalPrice = products.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductsToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartData.products.find(
        (item) => item._id === newItem._id && item.size === newItem.size && item.color === newItem.color,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartData.products.push(newItem);
      }
      recalculateCartTotals(state);
    },

    removeProductCart: (state, action) => {
      const { _id, size, color } = action.payload;

      state.cartData.products = state.cartData.products.filter(
        (product) => product._id !== _id || product.size !== size || product.color !== color,
      );
      recalculateCartTotals(state);
    },

    updateProductQuantity: (state, action) => {
      const { _id, size, color, quantity } = action.payload;

      const productToUpdate = state.cartData.products.find(
        (product) => product._id === _id && product.size === size && product.color === color,
      );

      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        recalculateCartTotals(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { addProductsToCart, removeProductCart, updateProductQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
