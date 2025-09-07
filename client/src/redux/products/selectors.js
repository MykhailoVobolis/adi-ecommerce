import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedOptions = (state) => state.products.selectedOptions;

// Мемоізований селектор для конкретного productId
export const selectSelectedOptionsById = (_id) =>
  createSelector([selectSelectedOptions], (selectedOptions) => selectedOptions[_id] ?? null);

export const selectProductsByCategory = (state) => state.products.products.byCategory;

export const selectCurentProduct = (state) => state.products.curentProduct;

export const selectLoading = (state) => state.products.loading;
