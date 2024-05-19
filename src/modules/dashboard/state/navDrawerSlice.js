import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false,
  selectedItemKey: 0,
};

const navDrawerSlice = createSlice({
  name: 'navDrawer',
  initialState,
  reducers: {
    selectNewItem: (state, action) => {
      state.selectedItemKey = action.payload;
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export default navDrawerSlice.reducer;
export const { selectNewItem, toggleCollapse } = navDrawerSlice.actions;
