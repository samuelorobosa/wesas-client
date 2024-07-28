import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  editProfile,
  getExchangeRates,
  getNotifications,
  getProfile,
} from '@/src/modules/profile/service/profileService.js';

export const getProfileThunk = createAsyncThunk(
  'profile/getProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getProfile(data);
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

export const editProfileThunk = createAsyncThunk(
  'profile/editProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await editProfile(data);
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

export const getExchangeRatesThunk = createAsyncThunk(
  'profile/getExchangeRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExchangeRates();
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

export const getNotificationsThunk = createAsyncThunk(
  'profile/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotifications();
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
