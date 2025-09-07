import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById, fetchProductsByCategory } from './operations.js';
import { resetAppState } from '../actions/globalActions.js';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

const initialState = {
  products: {
    byCategory: {
      men: {
        data: [],
        hasNextPage: null,
        hasPreviousPage: null,
        page: 1,
        perPage: 12,
        totalItems: null,
        totalPages: null,
      },
      women: {
        data: [],
        hasNextPage: null,
        hasPreviousPage: null,
        page: 1,
        perPage: 12,
        totalItems: null,
        totalPages: null,
      },
      kids: {
        data: [],
        hasNextPage: null,
        hasPreviousPage: null,
        page: 1,
        perPage: 12,
        totalItems: null,
        totalPages: null,
      },
    },
  },
  selectedOptions: {}, // { [productId]: { color, size } }
  curentProduct: {},
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductOptions: (state, action) => {
      const { productId, color, size } = action.payload;
      state.selectedOptions[productId] = { color, size };
    },

    setNewPage: (state, action) => {
      const { newPage, category } = action.payload;
      state.products.byCategory[category].page = newPage;
    },

    resetCategoryData: (state, action) => {
      const category = action.payload.label.toLowerCase();
      const currentPage = state.products.byCategory[category]?.page;

      if (currentPage !== 1) {
        state.products.byCategory[category] = {
          data: [],
          hasNextPage: null,
          hasPreviousPage: null,
          page: 1,
          perPage: 12,
          totalItems: null,
          totalPages: null,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, handlePending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.products.byCategory[category] = data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, handleRejected)

      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.curentProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, handleRejected)

      // Глобальне скидання стану при logout юзера
      .addCase(resetAppState, () => initialState);
  },
});

export const { setProductOptions, setNewPage, resetCategoryData } = productsSlice.actions;
export const productsReduser = productsSlice.reducer;
