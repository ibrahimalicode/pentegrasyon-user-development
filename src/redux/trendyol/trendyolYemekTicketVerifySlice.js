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

const trendyolYemekTicketVerifySlice = createSlice({
  name: "trendyolYemekTicketVerify",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekTicketVerify: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekTicketVerify.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(trendyolYemekTicketVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(trendyolYemekTicketVerify.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = { ...action.payload, ticketId: action.meta.arg.ticketId };
        state.data = null;
      });
  },
});

export const trendyolYemekTicketVerify = createAsyncThunk(
  "Trendyol/TicketVerify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}Trendyol/TicketVerify`,
        {},
        { params: { ...data } },
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      // console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekTicketVerify } =
  trendyolYemekTicketVerifySlice.actions;
export default trendyolYemekTicketVerifySlice.reducer;
