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

const yemekSepetiGetTicketCancelOptionsSlice = createSlice({
  name: "yemekSepetiGetTicketCancelOptions",
  initialState: initialState,
  reducers: {
    resetYemekSepetiGetTicketCancelOptions: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.options = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiGetTicketCancelOptions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.options = null;
      })
      .addCase(yemekSepetiGetTicketCancelOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.options = action.payload;
      })
      .addCase(yemekSepetiGetTicketCancelOptions.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.options = null;
      });
  },
});

export const yemekSepetiGetTicketCancelOptions = createAsyncThunk(
  "YemekSepeti/TicketCancelOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}YemekSepeti/TicketCancelOptions`, {
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

export const { resetYemekSepetiGetTicketCancelOptions } =
  yemekSepetiGetTicketCancelOptionsSlice.actions;
export default yemekSepetiGetTicketCancelOptionsSlice.reducer;
