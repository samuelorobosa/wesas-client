import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFunds,
  addGBPViaCard,
  getPastSubscriptions,
  getPlans,
  getTransactionHistory,
  getWalletDetails,
  subscribeToAPlan,
} from '@/src/modules/wallet/service/walletService.js';

export const addFundsThunk = createAsyncThunk(
  'profile/addFundsThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addFunds(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const addGBPViaCardThunk = createAsyncThunk(
  'profile/addGBPViaCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addGBPViaCard(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getWalletDetailsThunk = createAsyncThunk(
  'profile/getWalletDetailsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWalletDetails();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getTransactionHistoryThunk = createAsyncThunk(
  'profile/getTransactionHistoryThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTransactionHistory(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getPlansThunk = createAsyncThunk(
  'profile/getPlansThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPlans();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const subscribeToAPlanThunk = createAsyncThunk(
  'profile/subscribeToAPlanThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await subscribeToAPlan(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getPastSubscriptionsThunk = createAsyncThunk(
  'profile/getPastSubscriptionsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPastSubscriptions();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
