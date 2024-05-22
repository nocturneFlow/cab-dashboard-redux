import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

interface Manager {
  id: string;
  first_name: string;
  last_name: string;
}

const formSchema = z.object({
  first_name: z.string().min(1, { message: "Поле должно быть заполнено." }),
  last_name: z.string().min(1, { message: "Поле должно быть заполнено." }),
});

interface ManagerState {
  managers: Manager[];
  loading: boolean;
  error: string | null;
}

const initialState: ManagerState = {
  managers: [],
  loading: false,
  error: null,
};

export const addManager = createAsyncThunk(
  "manager/addManager",
  async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      "https://taxi-service-34d2f59aac8f.herokuapp.com/managers/addManager",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add manager");
    }

    const data = await response.json();
    return data;
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addManager.fulfilled,
        (state, action: PayloadAction<Manager>) => {
          state.loading = false;
          state.managers.push(action.payload);
        }
      )
      .addCase(addManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add manager";
      });
  },
});

export const managerReducer = managerSlice.reducer;
