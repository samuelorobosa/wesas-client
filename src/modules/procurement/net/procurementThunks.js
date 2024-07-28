import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder,
  createShipmentRequest,
  createSupplier,
  deleteSupplier,
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

export const getOrdersThunk = createAsyncThunk(
  'procurement/getOrdersThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getOrders(data);
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

export const createSupplierThunk = createAsyncThunk(
  'procurement/createSupplierThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSupplier(data);
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

export const getSuppliersThunk = createAsyncThunk(
  'procurement/getSuppliersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSuppliers();
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

export const deleteSupplierThunk = createAsyncThunk(
  'procurement/deleteSupplierThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSupplier(id);
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

export const createShipmentRequestThunk = createAsyncThunk(
  'procurement/createShipmentRequestThunk',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createShipmentRequest(data);
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
