import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const getOrderStatisticsSlice = createSlice({
  name: "getOrderStatistics",
  initialState: initialState,
  reducers: {
    resetGetOrderStatistics: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getOrderStatistics.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(getOrderStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getOrderStatistics.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const getOrderStatistics = createAsyncThunk(
  "Statistics/GetTicketStatistics",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Statistics/GetTicketStatistics`, {
        params: { ...data },
      });

      // console.log(res.data);
      return res.data.data;
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

export const { resetGetOrderStatistics } = getOrderStatisticsSlice.actions;
export default getOrderStatisticsSlice.reducer;
