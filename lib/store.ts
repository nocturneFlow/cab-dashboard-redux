import { configureStore } from "@reduxjs/toolkit";
import dateRangeReducer from "./dateRangeSlice";
import applicationReducer from "./applicationSlice";
import { carFormReducer } from "@/lib/carFormSlice";
import { managerReducer } from "@/lib/managerSlice";

export const store = configureStore({
  reducer: {
    dateRange: dateRangeReducer,
    application: applicationReducer,
    carForm: carFormReducer,
    manager: managerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
