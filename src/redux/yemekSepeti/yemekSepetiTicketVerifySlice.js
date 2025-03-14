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

const yemekSepetiTicketVerifySlice = createSlice({
  name: "yemekSepetiTicketVerify",
  initialState: initialState,
  reducers: {
    resetYemekSepetiTicketVerify: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiTicketVerify.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(yemekSepetiTicketVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(yemekSepetiTicketVerify.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = { ...action.payload, ticketId: action.meta.arg.ticketId };
        state.data = null;
      });
  },
});

export const yemekSepetiTicketVerify = createAsyncThunk(
  "YemekSepeti/TicketVerify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}YemekSepeti/TicketVerify`,
        {},
        { params: { ...data } }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      // console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetYemekSepetiTicketVerify } =
  yemekSepetiTicketVerifySlice.actions;
export default yemekSepetiTicketVerifySlice.reducer;
