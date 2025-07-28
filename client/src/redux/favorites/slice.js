import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';
import { addFavorite, getUserFavorites, removeFavorite } from './operations.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const initialState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavoriteLocal: (state, action) => {
      const exists = state.favoriteProducts.some(
        (product) => product._id === action.payload._id && product.selectedColor === action.payload.selectedColor,
      );

      if (!exists) {
        state.favoriteProducts.unshift(action.payload);
      }
    },
    removeFavoriteLocal: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => !(product._id === action.payload._id && product.selectedColor === action.payload.selectedColor),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFavorites.pending, handlePending)
      .addCase(getUserFavorites.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload.data.products;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserFavorites.rejected, handleRejected)

      .addCase(addFavorite.pending, handlePending)
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload.data.products;
        state.loading = false;
        state.error = null;
      })
      .addCase(addFavorite.rejected, handleRejected)

      .addCase(removeFavorite.pending, handlePending)
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload.data.products;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFavorite.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { addFavoriteLocal, removeFavoriteLocal } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
