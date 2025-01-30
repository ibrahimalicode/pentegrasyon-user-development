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

const getTicketByIdSlice = createSlice({
  name: "getTicketById",
  initialState: initialState,
  reducers: {
    resetGetTicketByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetTicketById: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.ticket = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getTicketById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.ticket = null;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.ticket = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.ticket = null;
      });
  },
});

export const getTicketById = createAsyncThunk(
  "Tickets/GetTicketById",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetTicketById`, {
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

export const { resetGetTicketByIdState, resetGetTicketById } =
  getTicketByIdSlice.actions;
export default getTicketByIdSlice.reducer;
