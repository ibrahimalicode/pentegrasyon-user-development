import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  logs: null,
};

const getLogsSlice = createSlice({
  name: "getLogs",
  initialState: initialState,
  reducers: {
    resetGetLogs: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.logs = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.logs = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.logs = null;
      });
  },
});

export const getLogs = createAsyncThunk(
  "ActivityLog/GetActivityLogs",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}ActivityLog/GetActivityLogs`, {
        params: data,
      });

      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  },
);

export const { resetGetLogs } = getLogsSlice.actions;
export default getLogsSlice.reducer;
