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

const migrosYemekGetTicketCancelOptionsSlice = createSlice({
  name: "migrosYemekGetTicketCancelOptions",
  initialState: initialState,
  reducers: {
    resetMigrosYemekGetTicketCancelOptions: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.options = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(migrosYemekGetTicketCancelOptions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.options = null;
      })
      .addCase(migrosYemekGetTicketCancelOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.options = action.payload;
      })
      .addCase(migrosYemekGetTicketCancelOptions.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.options = null;
      });
  },
});

export const migrosYemekGetTicketCancelOptions = createAsyncThunk(
  "MigrosYemek/TicketCancelOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}MigrosYemek/TicketCancelOptions`, {
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
  }
);

export const { resetMigrosYemekGetTicketCancelOptions } =
  migrosYemekGetTicketCancelOptionsSlice.actions;
export default migrosYemekGetTicketCancelOptionsSlice.reducer;
