import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import productSlices from "./slices/productSlices";


const reducers = combineReducers({
  auth: authSlice,
  products: productSlices,
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
    //   cannabisProtectedApi.middleware,
    ),
});

export const persistor = persistStore(store)

