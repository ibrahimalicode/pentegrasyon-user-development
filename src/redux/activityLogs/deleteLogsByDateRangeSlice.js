import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const deleteLogsByDateRangeSlice = createSlice({
  name: "deleteLogsByDateRange",
  initialState,
  reducers: {
    resetDeleteLogsByDateRange: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLogsByDateRange.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteLogsByDateRange.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteLogsByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const deleteLogsByDateRange = createAsyncThunk(
  "ActivityLog/DeleteByDateRange",
  async ({ fromDate, toDate }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`${baseURL}ActivityLog/DeleteByDateRange`, {
        params: { fromDate, toDate },
      });

      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  },
);

export const { resetDeleteLogsByDateRange } =
  deleteLogsByDateRangeSlice.actions;
export default deleteLogsByDateRangeSlice.reducer;
