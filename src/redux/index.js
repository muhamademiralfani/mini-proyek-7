import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import productsSlice from './async/productsSlice';
import logSlice from './async/logSlice';
import languageSlice from './slice/languageSlice';
import darkModeSlice from './slice/darkModeSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  logs: logSlice,
  language: languageSlice,
  darkMode: darkModeSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-very-secure-secret-key',
      onError: (error) => {
        console.error('Encryption error:', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
