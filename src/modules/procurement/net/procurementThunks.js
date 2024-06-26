import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder,
  createSupplier,
  getOrders,
  getSuppliers,
} from '@/src/modules/procurement/service/procurementService.js';

export const createOrderThunk = createAsyncThunk(
  'procurement/createOrderThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createOrder(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getOrdersThunk = createAsyncThunk(
  'procurement/getOrdersThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getOrders(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createSupplierThunk = createAsyncThunk(
  'procurement/createSupplierThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSupplier(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getSuppliersThunk = createAsyncThunk(
  'procurement/getSuppliersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSuppliers();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
