import { createSlice } from '@reduxjs/toolkit';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import {
  editProfileThunk,
  getExchangeRatesThunk,
  getNotificationsThunk,
  getProfileThunk,
} from '@/src/modules/profile/net/profileThunks.js';

const initialState = {
  get_profile: {
    loading: LoadingStates.base,
    data: {},
    error: null,
  },
  edit_profile: {
    loading: LoadingStates.base,
    data: {},
    response: null,
    error: null,
  },
  get_exchange_rates: {
    loading: LoadingStates.base,
    data: {},
    response: null,
    error: null,
  },
  get_notifications: {
    loading: LoadingStates.base,
    data: {},
    response: null,
    error: null,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Profile Thunk
    builder.addCase(getProfileThunk.pending, (state) => {
      state.get_profile.loading = LoadingStates.pending;
    });
    builder.addCase(getProfileThunk.fulfilled, (state, { payload }) => {
      state.get_profile.loading = LoadingStates.fulfilled;
      state.get_profile.data = payload.data;
    });
    builder.addCase(getProfileThunk.rejected, (state, { payload }) => {
      state.get_profile.loading = LoadingStates.rejected;
      state.get_profile.error = payload;
    });

    // Edit Profile Thunk
    builder.addCase(editProfileThunk.pending, (state) => {
      state.edit_profile.loading = LoadingStates.pending;
    });
    builder.addCase(editProfileThunk.fulfilled, (state, { payload }) => {
      state.edit_profile.loading = LoadingStates.fulfilled;
      state.edit_profile.response = payload;
    });
    builder.addCase(editProfileThunk.rejected, (state, { payload }) => {
      state.edit_profile.loading = LoadingStates.rejected;
      state.edit_profile.error = payload;
    });

    // Get Exchange Rates
    builder.addCase(getExchangeRatesThunk.pending, (state) => {
      state.get_exchange_rates.loading = LoadingStates.pending;
    });
    builder.addCase(getExchangeRatesThunk.fulfilled, (state, { payload }) => {
      state.get_exchange_rates.loading = LoadingStates.fulfilled;
      // console.log(payload);
      // state.get_exchange_rates.response = payload;
    });
    builder.addCase(getExchangeRatesThunk.rejected, (state, { payload }) => {
      state.get_exchange_rates.loading = LoadingStates.rejected;
      state.get_exchange_rates.error = payload;
    });

    // Get Notifications
    builder.addCase(getNotificationsThunk.pending, (state) => {
      state.get_notifications.loading = LoadingStates.pending;
    });
    builder.addCase(getNotificationsThunk.fulfilled, (state, { payload }) => {
      state.get_notifications.loading = LoadingStates.fulfilled;
      state.get_notifications.data = payload;
      console.log(payload);
    });
    builder.addCase(getNotificationsThunk.rejected, (state, { payload }) => {
      state.get_notifications.loading = LoadingStates.rejected;
      state.get_notifications.error = payload;
    });
  },
});

export default profileSlice.reducer;
