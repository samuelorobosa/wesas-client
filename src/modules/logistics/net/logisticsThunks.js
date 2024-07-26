import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  approveCourierQuote,
  approveShipment,
  createCourierRequest,
  getCouriers,
  getShipment,
  getShipments,
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

export const approveCourierQuoteThunk = createAsyncThunk(
  'logistics/approveCourierQuoteThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await approveCourierQuote(data);
      return response.data;
    } catch (err) {
      const message = err.response.data.errorMessage;
      return rejectWithValue(message);
    }
  },
);

export const getShipmentsThunk = createAsyncThunk(
  'logistics/getShipmentsThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getShipments(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getShipmentThunk = createAsyncThunk(
  'logistics/getShipmentThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getShipment(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const approveShipmentThunk = createAsyncThunk(
  'logistics/approveShipmentThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await approveShipment(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
