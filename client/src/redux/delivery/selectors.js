export const selectLoading = (state) => state.delivery.loading;

export const selectDeliveryCities = (state) => state.delivery.deliveryCities;

export const selectFilterCities = (state) => state.delivery.filterCities;

export const selectDeliveryAddress = (state) => state.delivery.deliveryAddress;

export const selectDeliveryWarehouseTypes = (state) => state.delivery.deliveryAddress.warehousesTypes;

export const selectWarehousesOfCity = (state) => state.delivery.warehousesOfCity;

export const selectStreetsOfCity = (state) => state.delivery.streetsOfCity;

export const selectFilterWarehouses = (state) => state.delivery.filterWarehouses;

export const selectDeliveryCost = (state) => state.delivery.deliveryCost;

export const selectFilterStreets = (state) => state.delivery.filterStreets;
