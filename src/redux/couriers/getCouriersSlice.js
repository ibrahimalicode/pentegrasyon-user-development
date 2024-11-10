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

const getCouriersSlice = createSlice({
  name: "getCouriers",
  initialState: initialState,
  reducers: {
    resetgetCouriersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetgetCouriers: (state) => {
      state.couriers = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getCouriers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.couriers = null;
      })
      .addCase(getCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.couriers = action.payload;
      })
      .addCase(getCouriers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.couriers = null;
      });
  },
});

export const getCouriers = createAsyncThunk(
  "Couriers/GetCouriers",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Couriers/GetCouriers`, {
        params: { ...data },
      });

      // console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetgetCouriersState, resetgetCouriers } =
  getCouriersSlice.actions;
export default getCouriersSlice.reducer;
