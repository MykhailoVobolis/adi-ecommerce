import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';
import { addProductsToCart, changeProductQuantity, deleteProductFromCart, getUserCart } from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

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
    addProductsToLocalCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartData.products.find(
        (item) => item._id === newItem._id && item.size === newItem.size && item.color === newItem.color,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartData.products.unshift(newItem);
      }
      recalculateCartTotals(state);
    },

    deleteProductFromLocalCart: (state, action) => {
      const { _id, size, color } = action.payload;

      state.cartData.products = state.cartData.products.filter(
        (product) => product._id !== _id || product.size !== size || product.color !== color,
      );
      recalculateCartTotals(state);
    },

    updateLocalProductQuantity: (state, action) => {
      const { _id, size, color, quantity } = action.payload;

      const productToUpdate = state.cartData.products.find(
        (product) => product._id === _id && product.size === size && product.color === color,
      );

      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        recalculateCartTotals(state);
      }
    },

    clearLocalCart: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, handlePending)
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cartData = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserCart.rejected, handleRejected)

      .addCase(addProductsToCart.pending, handlePending)
      .addCase(addProductsToCart.fulfilled, (state, action) => {
        state.cartData = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(addProductsToCart.rejected, handleRejected)

      .addCase(changeProductQuantity.pending, handlePending)
      .addCase(changeProductQuantity.fulfilled, (state, action) => {
        state.cartData = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(changeProductQuantity.rejected, handleRejected)

      .addCase(deleteProductFromCart.pending, handlePending)
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.cartData = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProductFromCart.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { addProductsToLocalCart, deleteProductFromLocalCart, updateLocalProductQuantity, clearLocalCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
