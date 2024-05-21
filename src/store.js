import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/state/authSlice.js';
import navDrawerReducer from './modules/dashboard/state/navDrawerSlice.js';
import profileReducer from './modules/profile/state/profileSlice.js';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
    navDrawer: navDrawerReducer,
    profile: profileReducer,
  },
});

export default store;
