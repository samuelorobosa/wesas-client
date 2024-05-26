import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFunds } from '@/src/modules/wallet/service/walletService.js';

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
