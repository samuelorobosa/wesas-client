import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { createSlice } from '@reduxjs/toolkit';
import {
  approveCourierQuoteThunk,
  approveShipmentThunk,
  createCourierRequestThunk,
  getCouriersThunk,
  getShipmentsThunk,
  getShipmentThunk,
} from '@/src/modules/logistics/net/logisticsThunks.js';

const initialState = {
  create_courier_request: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  get_couriers: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  approve_courier_quote: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  get_shipments: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  get_shipment: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  approve_shipment: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
};

const logisticsSlice = createSlice({
  name: 'logistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Courier Request Thunk
    builder.addCase(createCourierRequestThunk.pending, (state) => {
      state.create_courier_request.loading = LoadingStates.pending;
    });
    builder.addCase(
      createCourierRequestThunk.fulfilled,
      (state, { payload }) => {
        state.create_courier_request.loading = LoadingStates.fulfilled;
        state.create_courier_request.data = payload.data;
      },
    );
    builder.addCase(
      createCourierRequestThunk.rejected,
      (state, { payload }) => {
        state.create_courier_request.loading = LoadingStates.rejected;
        state.create_courier_request.error = payload;
      },
    );

    // Get Couriers Thunk
    builder.addCase(getCouriersThunk.pending, (state) => {
      state.get_couriers.loading = LoadingStates.pending;
    });
    builder.addCase(getCouriersThunk.fulfilled, (state, { payload }) => {
      state.get_couriers.loading = LoadingStates.fulfilled;
      state.get_couriers.data = payload.data;
    });
    builder.addCase(getCouriersThunk.rejected, (state, { payload }) => {
      state.get_couriers.loading = LoadingStates.rejected;
      state.get_couriers.error = payload;
    });

    //Approve Courier Quote Thunk
    builder.addCase(approveCourierQuoteThunk.pending, (state) => {
      state.approve_courier_quote.loading = LoadingStates.pending;
    });
    builder.addCase(
      approveCourierQuoteThunk.fulfilled,
      (state, { payload }) => {
        state.approve_courier_quote.loading = LoadingStates.fulfilled;
        state.approve_courier_quote.data = payload.data;
      },
    );
    builder.addCase(approveCourierQuoteThunk.rejected, (state, { payload }) => {
      state.approve_courier_quote.loading = LoadingStates.rejected;
      state.approve_courier_quote.error = payload;
    });

    // Get Shipments Thunk
    builder.addCase(getShipmentsThunk.pending, (state) => {
      state.get_shipments.loading = LoadingStates.pending;
    });
    builder.addCase(getShipmentsThunk.fulfilled, (state, { payload }) => {
      state.get_shipments.loading = LoadingStates.fulfilled;
      state.get_shipments.data = payload.data;
    });
    builder.addCase(getShipmentsThunk.rejected, (state, { payload }) => {
      state.get_shipments.loading = LoadingStates.rejected;
      state.get_shipments.error = payload;
    });

    // Get Shipment Thunk
    builder.addCase(getShipmentThunk.pending, (state) => {
      state.get_shipment.loading = LoadingStates.pending;
    });
    builder.addCase(getShipmentThunk.fulfilled, (state, { payload }) => {
      state.get_shipment.loading = LoadingStates.fulfilled;
      state.get_shipment.data = payload.data;
    });
    builder.addCase(getShipmentThunk.rejected, (state, { payload }) => {
      state.get_shipment.loading = LoadingStates.rejected;
      state.get_shipment.error = payload;
    });

    // Approve Shipment Thunk
    builder.addCase(approveShipmentThunk.pending, (state) => {
      state.approve_shipment.loading = LoadingStates.pending;
    });
    builder.addCase(approveShipmentThunk.fulfilled, (state, { payload }) => {
      state.approve_shipment.loading = LoadingStates.fulfilled;
      state.approve_shipment.data = payload.data;
    });
    builder.addCase(approveShipmentThunk.rejected, (state, { payload }) => {
      state.approve_shipment.loading = LoadingStates.rejected;
      state.approve_shipment.error = payload;
    });
  },
});
export default logisticsSlice.reducer;
