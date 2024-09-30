import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  ticketStatus: null,
};

const updateTicketStatusSlice = createSlice({
  name: "updateTicketStatus",
  initialState: initialState,
  reducers: {
    resetUpdateTicketStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.ticketStatus = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateTicketStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.ticketStatus = null;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.ticketStatus = action.payload;
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.ticketStatus = null;
      });
  },
});

export const updateTicketStatus = createAsyncThunk(
  "Tickets/UpdateTicketStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Tickets/UpdateTicketStatus`,
        { ...data },
        {
          params: { ...data },
        }
      );

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

export const { resetUpdateTicketStatus } = updateTicketStatusSlice.actions;
export default updateTicketStatusSlice.reducer;
