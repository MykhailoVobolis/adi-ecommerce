import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/globalActions.js';

const initialState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favoriteProducts.some(
        (product) => product._id === action.payload._id && product.selectedColor === action.payload.selectedColor,
      );

      if (!exists) {
        state.favoriteProducts.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => !(product._id === action.payload._id && product.selectedColor === action.payload.selectedColor),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
