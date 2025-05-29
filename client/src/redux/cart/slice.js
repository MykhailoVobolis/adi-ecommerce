import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: {
    products: [],
    totalPrice: 0,
    totalQuantityProducts: 0,
    totalUniqueProducts: 0,
  },
  loading: false,
  error: null,
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

      state.cartData.totalQuantityProducts = state.cartData.products.reduce((total, item) => total + item.quantity, 0);
      state.cartData.totalPrice = state.cartData.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    removeProductCart: (state, action) => {
      const { _id, size, color } = action.payload;

      state.cartData.products = state.cartData.products.filter(
        (product) => product._id !== _id || product.size !== size || product.color !== color,
      );

      state.cartData.totalQuantityProducts = state.cartData.products.reduce((total, item) => total + item.quantity, 0);
      state.cartData.totalPrice = state.cartData.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
  },
});

export const { addProductsToCart, removeProductCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
