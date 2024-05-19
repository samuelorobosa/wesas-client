import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/state/authSlice.js';

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        auth: authReducer,
    },
});

export default store;
