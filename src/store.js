import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/state/authSlice.js';
import navDrawerReducer from './modules/dashboard/state/navDrawerSlice.js';
import profileReducer from './modules/profile/state/profileSlice.js';
import walletReducer from './modules/wallet/state/walletSlice.js';
import procurementReducer from './modules/procurement/state/procurementSlice.js';
import logisticsReducer from './modules/logistics/state/logisticsSlice.js';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
    navDrawer: navDrawerReducer,
    profile: profileReducer,
    wallet: walletReducer,
    procurement: procurementReducer,
    logistics: logisticsReducer,
  },
});

export default store;
