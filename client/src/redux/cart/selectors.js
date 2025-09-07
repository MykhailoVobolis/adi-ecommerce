export const selectTotalQuantityProducts = (state) => state.cart.cartData.totalQuantityProducts;

export const selectCartData = (state) => state.cart.cartData;

export const selectIsLoading = (state) => state.cart.loading;
