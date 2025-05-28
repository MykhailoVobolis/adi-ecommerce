import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {
    data: [],
  },
  selectedOptions: {}, // { [productId]: { color, size } }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductOptions: (state, action) => {
      const { productId, color, size } = action.payload;
      state.selectedOptions[productId] = { color, size };
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setProductOptions } = productsSlice.actions;
export const productsReduser = productsSlice.reducer;
