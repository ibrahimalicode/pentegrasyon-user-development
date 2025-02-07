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

const getTicketCountStatisticsSlice = createSlice({
  name: "getTicketCountStatistics",
  initialState: initialState,
  reducers: {
    resetGetTicketCountStatistics: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getTicketCountStatistics.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(getTicketCountStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getTicketCountStatistics.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const getTicketCountStatistics = createAsyncThunk(
  "Statistics/GetTicketCountStatistics",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Statistics/GetTicketCountStatistics`,
        {
          params: { ...data },
        }
      );

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

export const { resetGetTicketCountStatistics } =
  getTicketCountStatisticsSlice.actions;
export default getTicketCountStatisticsSlice.reducer;
