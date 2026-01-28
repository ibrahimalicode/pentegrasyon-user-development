import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  options: null,
};

const trendyolYemekGetTicketCancelOptionsSlice = createSlice({
  name: "trendyolYemekGetTicketCancelOptions",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekGetTicketCancelOptions: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.options = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekGetTicketCancelOptions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.options = null;
      })
      .addCase(
        trendyolYemekGetTicketCancelOptions.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.options = action.payload;
        },
      )
      .addCase(
        trendyolYemekGetTicketCancelOptions.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.options = null;
        },
      );
  },
});

export const trendyolYemekGetTicketCancelOptions = createAsyncThunk(
  "Trendyol/TicketCancelOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Trendyol/TicketCancelOptions`, {
        params: { ...data },
      });

      // console.log(res);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekGetTicketCancelOptions } =
  trendyolYemekGetTicketCancelOptionsSlice.actions;
export default trendyolYemekGetTicketCancelOptionsSlice.reducer;
