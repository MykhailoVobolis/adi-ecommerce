import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsReduser } from "./products/slice.js";

// Збереження токіна в Local Storage
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["accessToken", "refreshToken"],
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authReduser);

const productsPersistConfig = {
  key: "products",
  storage,
  whitelist: ["selectedOptions"],
};
const persistedProductsReducer = persistReducer(productsPersistConfig, productsReduser);

export const store = configureStore({
  reducer: {
    // auth: persistedAuthReducer,
    products: persistedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
