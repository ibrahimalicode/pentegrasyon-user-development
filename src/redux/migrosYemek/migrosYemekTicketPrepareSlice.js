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

const migrosYemekTicketPrepareSlice = createSlice({
  name: "migrosYemekTicketPrepare",
  initialState: initialState,
  reducers: {
    resetMigrosYemekTicketPrepare: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(migrosYemekTicketPrepare.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(migrosYemekTicketPrepare.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(migrosYemekTicketPrepare.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = { ...action.payload, ticketId: action.meta.arg.ticketId };
        state.data = null;
      });
  },
});

export const migrosYemekTicketPrepare = createAsyncThunk(
  "MigrosYemek/TicketPrepare",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}MigrosYemek/TicketPrepare`,
        {},
        { params: { ...data } }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetMigrosYemekTicketPrepare } =
  migrosYemekTicketPrepareSlice.actions;
export default migrosYemekTicketPrepareSlice.reducer;
