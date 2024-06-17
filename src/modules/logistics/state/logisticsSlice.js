import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { createSlice } from '@reduxjs/toolkit';
import {
  createCourierRequestThunk,
  getCouriersThunk,
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
  },
});
export default logisticsSlice.reducer;
