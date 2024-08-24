import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;
const PAYTRURL = import.meta.env.VITE_PAYTR_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const extendByOnlinePaySlice = createSlice({
  name: "extendByOnlinePay",
  initialState: initialState,
  reducers: {
    resetextendByOnlinePay: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(extendByOnlinePay.pending, (state) => {
        state.loading = true;
      })
      .addCase(extendByOnlinePay.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(extendByOnlinePay.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const extendByOnlinePay = createAsyncThunk(
  "Licenses/Extend/extendByOnlinePay",
  async ({ licenseId, paymentData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${PAYTRURL}Licenses/Extend/extendByOnlinePay`,
        {},
        { params: { licenseId, paymentData } }
      );

      console.log(res);
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

export const { resetextendByOnlinePay } = extendByOnlinePaySlice.actions;
export default extendByOnlinePaySlice.reducer;
