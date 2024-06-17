import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCourierRequest,
  getCouriers,
} from '@/src/modules/logistics/service/logisticsService.js';

export const createCourierRequestThunk = createAsyncThunk(
  'logistics/createCourierRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCourierRequest(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getCouriersThunk = createAsyncThunk(
  'logistics/getCouriersThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getCouriers(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
