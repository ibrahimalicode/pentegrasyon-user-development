import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  services: null,
};

const getAvailableCourierServicesSlice = createSlice({
  name: "getAvailableCourierServices",
  initialState: initialState,
  reducers: {
    resetgetAvailableCourierServices: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.services = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAvailableCourierServices.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.services = null;
      })
      .addCase(getAvailableCourierServices.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.services = action.payload;
      })
      .addCase(getAvailableCourierServices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.services = null;
      });
  },
});

export const getAvailableCourierServices = createAsyncThunk(
  "Couriers/GetAvailableCourierServices",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Couriers/GetAvailableCourierServices`,
        {
          ...data,
        },
        { params: { ...data } }
      );

      console.log(res.data);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetgetAvailableCourierServices } =
  getAvailableCourierServicesSlice.actions;
export default getAvailableCourierServicesSlice.reducer;
