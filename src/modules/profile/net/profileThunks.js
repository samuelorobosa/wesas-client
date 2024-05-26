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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  },
);
