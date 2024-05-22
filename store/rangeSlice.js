import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  min: 1,
  max: 100,
  rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  selectedRange: { min: 1, max: 100 }
};

const rangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setRange(state, action) {
      state.selectedRange = action.payload;
    },
  },
});

export const { setRange } = rangeSlice.actions;

export default rangeSlice.reducer;
