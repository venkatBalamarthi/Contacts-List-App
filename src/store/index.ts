import {configureStore} from '@reduxjs/toolkit';
import contactsReducer from './slices/contactSlice'
import appCommonReducer from './slices/commonSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    common: appCommonReducer
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
