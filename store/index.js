import { configureStore } from '@reduxjs/toolkit';
import rangeReducer from './rangeSlice';

const store = configureStore({
  reducer: {
    range: rangeReducer,
  },
});

export default store;
