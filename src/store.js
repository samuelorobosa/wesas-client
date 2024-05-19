import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/state/authSlice.js';
import navDrawerReducer from './modules/dashboard/state/navDrawerSlice.js';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
    navDrawer: navDrawerReducer,
  },
});

export default store;
