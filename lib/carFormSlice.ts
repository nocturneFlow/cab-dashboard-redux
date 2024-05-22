// carFormSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

interface Car {
  id: string;
  car_plate_number: string;
  car_model: string;
}

const formSchema = z.object({
  car_plate_number: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." }),
  car_model: z.string().min(1, { message: "Поле должно быть заполнено." }),
});

interface CarFormState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarFormState = {
  cars: [],
  loading: false,
  error: null,
};

export const addCar = createAsyncThunk(
  "carForm/addCar",
  async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      "https://taxi-service-34d2f59aac8f.herokuapp.com/cars/addCar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add car");
    }

    const data = await response.json();
    return data;
  }
);

const carFormSlice = createSlice({
  name: "carForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add car";
      });
  },
});

export const carFormReducer = carFormSlice.reducer;
