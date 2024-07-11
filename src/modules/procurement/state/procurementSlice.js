import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { createSlice } from '@reduxjs/toolkit';
import {
  createOrderThunk,
  createShipmentRequestThunk,
  createSupplierThunk,
  getOrdersThunk,
  getSuppliersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';

const initialState = {
  create_order: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  get_orders: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  create_supplier: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  get_suppliers: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  create_shipment_request: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
};

const procurementSlice = createSlice({
  name: 'procurement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Order Thunk
    builder.addCase(createOrderThunk.pending, (state) => {
      state.create_order.loading = LoadingStates.pending;
    });
    builder.addCase(createOrderThunk.fulfilled, (state, { payload }) => {
      state.create_order.loading = LoadingStates.fulfilled;
      state.create_order.data = payload.data;
    });
    builder.addCase(createOrderThunk.rejected, (state, { payload }) => {
      state.create_order.loading = LoadingStates.rejected;
      state.create_order.error = payload;
    });

    // Get Orders Thunk
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.get_orders.loading = LoadingStates.pending;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.get_orders.loading = LoadingStates.fulfilled;
      state.get_orders.data = payload.data;
    });
    builder.addCase(getOrdersThunk.rejected, (state, { payload }) => {
      state.get_orders.loading = LoadingStates.rejected;
      state.get_orders.error = payload;
    });

    // Create Supplier Thunk
    builder.addCase(createSupplierThunk.pending, (state) => {
      state.create_supplier.loading = LoadingStates.pending;
    });
    builder.addCase(createSupplierThunk.fulfilled, (state, { payload }) => {
      state.create_supplier.loading = LoadingStates.fulfilled;
      state.create_supplier.data = payload.data;
    });
    builder.addCase(createSupplierThunk.rejected, (state, { payload }) => {
      state.create_supplier.loading = LoadingStates.rejected;
      state.create_supplier.error = payload;
    });

    // Get Suppliers Thunk
    builder.addCase(getSuppliersThunk.pending, (state) => {
      state.get_suppliers.loading = LoadingStates.pending;
    });
    builder.addCase(getSuppliersThunk.fulfilled, (state, { payload }) => {
      state.get_suppliers.loading = LoadingStates.fulfilled;
      state.get_suppliers.data = payload.data;
    });
    builder.addCase(getSuppliersThunk.rejected, (state, { payload }) => {
      state.get_suppliers.loading = LoadingStates.rejected;
      state.get_suppliers.error = payload;
    });

    // Create Shipment Thunk
    builder.addCase(createShipmentRequestThunk.pending, (state) => {
      state.create_shipment_request.loading = LoadingStates.pending;
    });
    builder.addCase(
      createShipmentRequestThunk.fulfilled,
      (state, { payload }) => {
        state.create_shipment_request.loading = LoadingStates.fulfilled;
        state.create_shipment_request.data = payload.data;
      },
    );
    builder.addCase(
      createShipmentRequestThunk.rejected,
      (state, { payload }) => {
        state.create_shipment_request.loading = LoadingStates.rejected;
        state.create_shipment_request.error = payload;
      },
    );
  },
});
export default procurementSlice.reducer;
