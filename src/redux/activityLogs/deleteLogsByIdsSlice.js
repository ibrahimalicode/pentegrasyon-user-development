import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const deleteLogsByIdsSlice = createSlice({
  name: "deleteLogsByIds",
  initialState,
  reducers: {
    resetDeleteLogsByIds: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLogsByIds.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteLogsByIds.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteLogsByIds.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const deleteLogsByIds = createAsyncThunk(
  "ActivityLog/DeleteByIds",
  async (logIds, { rejectWithValue }) => {
    try {
      const res = await api.delete(`${baseURL}ActivityLog/DeleteByIds`, {
        data: logIds,
      });

      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  },
);

export const { resetDeleteLogsByIds } = deleteLogsByIdsSlice.actions;
export default deleteLogsByIdsSlice.reducer;
