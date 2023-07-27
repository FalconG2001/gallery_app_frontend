import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import galleryReducer from "./features/gallery/gallerySlice";
import { authApi } from "./features/auth/authService";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/es/storage/session";

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  blacklist: ["authApi"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
