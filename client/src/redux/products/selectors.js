import { createSelector } from "@reduxjs/toolkit";

export const selectSelectedOptions = (state) => state.products.selectedOptions;

// Мемоізований селектор для конкретного productId
export const selectSelectedOptionsById = (_id) =>
  createSelector([selectSelectedOptions], (selectedOptions) => selectedOptions[_id] ?? null);
