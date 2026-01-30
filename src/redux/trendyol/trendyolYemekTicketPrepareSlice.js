import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const trendyolYemekTicketPrepareSlice = createSlice({
  name: "trendyolYemekTicketPrepare",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekTicketPrepare: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekTicketPrepare.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(trendyolYemekTicketPrepare.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(trendyolYemekTicketPrepare.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = { ...action.payload, ticketId: action.meta.arg.ticketId };
        state.data = null;
      });
  },
});

export const trendyolYemekTicketPrepare = createAsyncThunk(
  "Trendyol/TicketPrepared",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}Trendyol/TicketPrepared`,
        {},
        { params: { ...data } },
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekTicketPrepare } =
  trendyolYemekTicketPrepareSlice.actions;
export default trendyolYemekTicketPrepareSlice.reducer;
