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

const yemekSepetiTicketCancelSlice = createSlice({
  name: "yemekSepetiTicketCancel",
  initialState: initialState,
  reducers: {
    resetyemekSepetiTicketCancel: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiTicketCancel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(yemekSepetiTicketCancel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(yemekSepetiTicketCancel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = { ...action.payload, ticketId: action.meta.arg.ticketId };
        state.data = null;
      });
  },
});

export const yemekSepetiTicketCancel = createAsyncThunk(
  "YemekSepeti/TicketCancel",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await api.post(
        `${baseURL}YemekSepeti/TicketCancel`,
        { ...data },
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

export const { resetyemekSepetiTicketCancel } =
  yemekSepetiTicketCancelSlice.actions;
export default yemekSepetiTicketCancelSlice.reducer;
