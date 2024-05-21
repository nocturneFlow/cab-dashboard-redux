import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  car: Car;
}

export interface Schedule {
  id: number;
  schedule: string;
}

export interface ExpenseItemApl {
  id: number;
  expense_item_name: string;
}

interface ApplicationData {
  managers: Manager[];
  cars: Car[];
  drivers: Driver[];
  schedules: Schedule[];
  expenseItemApls: ExpenseItemApl[];
}

interface ApplicationState {
  managers: Manager[];
  cars: Car[];
  drivers: Driver[];
  schedules: Schedule[];
  expenseItemApls: ExpenseItemApl[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  managers: [],
  cars: [],
  drivers: [],
  schedules: [],
  expenseItemApls: [],
  loading: true,
  error: null,
};

export const fetchData = createAsyncThunk<
  ApplicationData,
  void,
  { rejectValue: string }
>("application/fetchData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://taxi-service-34d2f59aac8f.herokuapp.com/applications/addApplication"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: ApplicationData = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<ApplicationData>) => {
          state.managers = action.payload.managers;
          state.cars = action.payload.cars;
          state.drivers = action.payload.drivers;
          state.schedules = action.payload.schedules;
          state.expenseItemApls = action.payload.expenseItemApls;
          state.loading = false;
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default applicationSlice.reducer;
