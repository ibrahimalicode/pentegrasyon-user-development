import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  couriers: null,
};

const getAvailableCouriersSlice = createSlice({
  name: "getAvailableCouriers",
  initialState: initialState,
  reducers: {
    resetgetAvailableCouriers: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.couriers = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAvailableCouriers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.couriers = null;
      })
      .addCase(getAvailableCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.couriers = action.payload;
      })
      .addCase(getAvailableCouriers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.couriers = null;
      });
  },
});

export const getAvailableCouriers = createAsyncThunk(
  "Couriers/GetAvailableCouriers",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Couriers/GetAvailableCouriers`, {
        params: { ...data },
      });

      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetgetAvailableCouriers } = getAvailableCouriersSlice.actions;
export default getAvailableCouriersSlice.reducer;
