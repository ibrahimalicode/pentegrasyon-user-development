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

const updateOrderCourierSlice = createSlice({
  name: "updateOrderCourier",
  initialState: initialState,
  reducers: {
    resetupdateOrderCourier: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateOrderCourier.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateOrderCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateOrderCourier.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateOrderCourier = createAsyncThunk(
  "Tickets/UpdateOrderCourier",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}Tickets/UpdateOrderCourier`,
        { ...data },
        { params: { ...data } }
      );

      // console.log(res.data);
      return res.data;
    } catch (err) {
      // console.log(err);
      const errorMessage = err.message;
      return rejectWithValue({
        message: errorMessage,
        status: err?.response?.status,
      });
    }
  }
);

export const { resetupdateOrderCourier } = updateOrderCourierSlice.actions;
export default updateOrderCourierSlice.reducer;
