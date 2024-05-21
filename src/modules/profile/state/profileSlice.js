import { createSlice } from '@reduxjs/toolkit';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import {
  editProfileThunk,
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
  },
});

export default profileSlice.reducer;
