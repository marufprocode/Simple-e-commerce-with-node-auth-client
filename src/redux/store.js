import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import baseApi from "./rtk/baseApi";
import authSlice from "./slices/authSlice";
import productSlices from "./slices/productSlices";


const reducers = combineReducers({
  auth: authSlice,
  products: productSlices,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "simple-e-com",
  storage,
};


const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      baseApi.middleware,
    ),
});

export const persistor = persistStore(store)

