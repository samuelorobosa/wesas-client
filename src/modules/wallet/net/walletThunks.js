import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFunds,
  addGBPViaCard,
  getBanks,
  getPastSubscriptions,
  getPlans,
  getTransactionHistory,
  getWalletDetails,
  subscribeToAPlan,
} from '@/src/modules/wallet/service/walletService.js';

export const addFundsThunk = createAsyncThunk(
  'wallet/addFundsThunk',
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
  'wallet/addGBPViaCard',
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
  'wallet/getWalletDetailsThunk',
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
  'wallet/getTransactionHistoryThunk',
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
  'wallet/getPlansThunk',
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
  'wallet/subscribeToAPlanThunk',
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
  'wallet/getPastSubscriptionsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPastSubscriptions();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getBanksThunk = createAsyncThunk(
  'wallet/getBanksThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBanks();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
