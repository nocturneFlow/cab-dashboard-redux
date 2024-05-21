import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateRangeState {
  from: Date | undefined;
  to: Date | undefined;
}

const initialState: DateRangeState = {
  from: undefined,
  to: undefined,
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<DateRangeState>) {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    resetDateRange(state) {
      state.from = undefined;
      state.to = undefined;
    },
  },
});

export const { setDateRange, resetDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
