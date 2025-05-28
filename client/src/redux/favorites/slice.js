import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favoriteProducts.some((product) => product._id === action.payload._id);

      if (!exists) {
        state.favoriteProducts.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter((product) => product._id !== action.payload._id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
