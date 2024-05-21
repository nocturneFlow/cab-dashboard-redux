import { configureStore } from "@reduxjs/toolkit";
import dateRangeReducer from "./dateRangeSlice";
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    dateRange: dateRangeReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
