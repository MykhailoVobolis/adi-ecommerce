import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { productsReduser } from './products/slice.js';
import { favoritesReducer } from './favorites/slice.js';
import { cartReducer } from './cart/slice.js';
import { deliveryReducer } from './delivery/slice.js';
import { checkoutReducer } from './checkout/slice.js';
import { authReduser } from './auth/slice.js';
import { setStore } from '../utils/refreshHandler.js';

// Збереження токіна в Local Storage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'wasRefreshed'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReduser);

const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['selectedOptions', 'products'],
};

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favoriteProducts'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartData'],
};

const deliveryPersistConfig = {
  key: 'delivery',
  storage,
  whitelist: ['warehousesTypes'],
};

const checkoutPersistConfig = {
  key: 'pre-order',
  storage,
  whitelist: ['deliveryAddress', 'customer', 'selectedDeliveryCost'],
};

const persistedProductsReducer = persistReducer(productsPersistConfig, productsReduser);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedDeliveryReducer = persistReducer(deliveryPersistConfig, deliveryReducer);
const persistedCheckoutReduser = persistReducer(checkoutPersistConfig, checkoutReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductsReducer,
    favorites: persistedFavoritesReducer,
    cart: persistedCartReducer,
    delivery: persistedDeliveryReducer,
    checkout: persistedCheckoutReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// записуємо актуальний стор для refresh
setStore(store);

export const persistor = persistStore(store);
