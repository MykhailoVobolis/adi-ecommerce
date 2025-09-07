export const selectConfirmedOrder = (state) => state.orders.confirmedOrder;

export const selectUserOrders = (state) => state.orders.userOrders;

export const selectPaginationOrders = (state) => state.orders.pagination;

export const selectIsLoading = (state) => state.orders.loading;
