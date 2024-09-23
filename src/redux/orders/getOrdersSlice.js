import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  orders: null,
};

const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState: initialState,
  reducers: {
    resetGetOrdersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetOrders: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.orders = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.orders = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.orders = null;
      });
  },
});

export const getOrders = createAsyncThunk(
  "Tickets/GetTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetTickets`);

      // console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetGetOrdersState, resetGetOrders } = getOrdersSlice.actions;
export default getOrdersSlice.reducer;
