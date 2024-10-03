import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const deleteCourierSlice = createSlice({
  name: "deleteCourier",
  initialState: initialState,
  reducers: {
    resetdeleteCourier: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(deleteCourier.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(deleteCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(deleteCourier.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const deleteCourier = createAsyncThunk(
  "Couriers/DeleteCourierById",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await api.delete(`${baseURL}Couriers/DeleteCourierById`, {
        params: {
          ...data,
        },
      });

      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetdeleteCourier } = deleteCourierSlice.actions;
export default deleteCourierSlice.reducer;
