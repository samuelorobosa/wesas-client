import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPassword,
  getCountries,
  login,
  registerUser,
  resetPassword,
  verifyEmail,
} from '../services/authService.js';

export const getCountriesThunk = createAsyncThunk(
  'auth/getCountries',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getCountries(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);

export const verifyEmailThunk = createAsyncThunk(
  'auth/verifyEmail',
  async (data, { rejectWithValue }) => {
    try {
      const response = await verifyEmail(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (err) {
      if (err.response.status === 400) {
        const message = err.response.data.errorMessage;
        return rejectWithValue(message);
      } else {
        const message = err.response.data;
        return rejectWithValue(message);
      }
    }
  },
);
