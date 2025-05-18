import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  ticket: null,
};

const getCourierByIdSlice = createSlice({
  name: "getCourierById",
  initialState: initialState,
  reducers: {
    resetGetCourierById: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.ticket = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getCourierById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.ticket = null;
      })
      .addCase(getCourierById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.ticket = action.payload;
      })
      .addCase(getCourierById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.ticket = null;
      });
  },
});

export const getCourierById = createAsyncThunk(
  "Couriers/GetCourierById",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Couriers/GetCourierById`, {
        params: data,
      });

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

export const { resetGetCourierByIdState, resetGetCourierById } =
  getCourierByIdSlice.actions;
export default getCourierByIdSlice.reducer;
