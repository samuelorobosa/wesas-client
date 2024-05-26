import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { createSlice } from '@reduxjs/toolkit';
import { addFundsThunk } from '@/src/modules/wallet/net/walletThunks.js';

const initialState = {
  add_funds: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Funds Thunk
    builder.addCase(addFundsThunk.pending, (state) => {
      state.add_funds.loading = LoadingStates.pending;
    });
    builder.addCase(addFundsThunk.fulfilled, (state, { payload }) => {
      state.add_funds.loading = LoadingStates.fulfilled;
      state.add_funds.data = payload.data;
    });
    builder.addCase(addFundsThunk.rejected, (state, { payload }) => {
      state.add_funds.loading = LoadingStates.rejected;
      state.add_funds.error = payload;
    });
  },
});
export default walletSlice.reducer;
