import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { createSlice } from '@reduxjs/toolkit';
import {
  addFundsThunk,
  addGBPViaCardThunk,
  getBanksThunk,
  getPastSubscriptionsThunk,
  getPlansThunk,
  getTransactionHistoryThunk,
  getWalletDetailsThunk,
  subscribeToAPlanThunk,
} from '@/src/modules/wallet/net/walletThunks.js';

const initialState = {
  add_funds: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  add_gbp_via_card: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  add_funds_uk: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  wallet_details: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  get_transaction_history: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  get_plans: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  subscribe: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  get_past_subscriptions: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
  banks: {
    loading: LoadingStates.base,
    data: [],
    error: null,
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetAddFundsLoadingState(state) {
      state.add_funds.loading = LoadingStates.base;
    },
  },
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

    // Get Wallet Details
    builder.addCase(getWalletDetailsThunk.pending, (state) => {
      state.wallet_details.loading = LoadingStates.pending;
    });
    builder.addCase(getWalletDetailsThunk.fulfilled, (state, { payload }) => {
      state.wallet_details.loading = LoadingStates.fulfilled;
      state.wallet_details.data = payload.data;
    });
    builder.addCase(getWalletDetailsThunk.rejected, (state, { payload }) => {
      state.wallet_details.loading = LoadingStates.rejected;
      state.wallet_details.error = payload;
    });

    // Get Transaction History
    builder.addCase(getTransactionHistoryThunk.pending, (state) => {
      state.get_transaction_history.loading = LoadingStates.pending;
    });
    builder.addCase(
      getTransactionHistoryThunk.fulfilled,
      (state, { payload }) => {
        state.get_transaction_history.loading = LoadingStates.fulfilled;
        state.get_transaction_history.data = payload.data;
      },
    );
    builder.addCase(
      getTransactionHistoryThunk.rejected,
      (state, { payload }) => {
        state.get_transaction_history.loading = LoadingStates.rejected;
        state.get_transaction_history.error = payload;
      },
    );

    // Add GBP via Card
    builder.addCase(addGBPViaCardThunk.pending, (state) => {
      state.add_gbp_via_card.loading = LoadingStates.pending;
    });
    builder.addCase(addGBPViaCardThunk.fulfilled, (state, { payload }) => {
      state.add_gbp_via_card.loading = LoadingStates.fulfilled;
      window.open(payload.data.checkoutUrl, '_self');
    });
    builder.addCase(addGBPViaCardThunk.rejected, (state, { payload }) => {
      state.add_gbp_via_card.loading = LoadingStates.rejected;
      state.add_gbp_via_card.error = payload;
    });

    // Get Plans
    builder.addCase(getPlansThunk.pending, (state) => {
      state.get_plans.loading = LoadingStates.pending;
    });
    builder.addCase(getPlansThunk.fulfilled, (state, { payload }) => {
      state.get_plans.loading = LoadingStates.fulfilled;
      state.get_plans.data = payload.data;
    });
    builder.addCase(getPlansThunk.rejected, (state, { payload }) => {
      state.get_plans.loading = LoadingStates.rejected;
      state.get_plans.error = payload;
    });

    // Subscribe
    builder.addCase(subscribeToAPlanThunk.pending, (state) => {
      state.subscribe.loading = LoadingStates.pending;
    });
    builder.addCase(subscribeToAPlanThunk.fulfilled, (state, { payload }) => {
      state.subscribe.loading = LoadingStates.fulfilled;
      state.subscribe.data = payload.data;
    });
    builder.addCase(subscribeToAPlanThunk.rejected, (state, { payload }) => {
      state.subscribe.loading = LoadingStates.rejected;
      state.subscribe.error = payload;
    });

    //Get Past Subscriptions
    builder.addCase(getPastSubscriptionsThunk.pending, (state) => {
      state.get_past_subscriptions.loading = LoadingStates.pending;
    });
    builder.addCase(
      getPastSubscriptionsThunk.fulfilled,
      (state, { payload }) => {
        state.get_past_subscriptions.loading = LoadingStates.fulfilled;
        state.get_past_subscriptions.data = payload.data;
      },
    );
    builder.addCase(
      getPastSubscriptionsThunk.rejected,
      (state, { payload }) => {
        state.get_past_subscriptions.loading = LoadingStates.rejected;
        state.get_past_subscriptions.error = payload;
      },
    );

    //Get Banks Thunk
    builder.addCase(getBanksThunk.pending, (state) => {
      state.banks.loading = LoadingStates.pending;
    });
    builder.addCase(getBanksThunk.fulfilled, (state, { payload }) => {
      state.banks.loading = LoadingStates.fulfilled;
      state.banks.data = payload.data;
    });
    builder.addCase(getBanksThunk.rejected, (state, { payload }) => {
      state.banks.loading = LoadingStates.rejected;
      state.banks.error = payload;
    });
  },
});

export const { resetAddFundsLoadingState } = walletSlice.actions;
export default walletSlice.reducer;
