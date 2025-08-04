export const selectDeliveryAddress = (state) => state.checkout.deliveryAddress;

export const selectCustomer = (state) => state.checkout.customer;

export const selectDeliveryCost = (state) => state.checkout.selectedDeliveryCost;

export const selectPaymentMethod = (state) => state.checkout.paymentMethod;
