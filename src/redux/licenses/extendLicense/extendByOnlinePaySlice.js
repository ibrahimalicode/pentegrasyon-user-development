import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

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
    resetExtendByOnlinePay: (state) => {
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
  "PayTR/ExtendLicenseByPay",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`${baseURL}PayTR/ExtendLicenseByPay`, {
        ...data,
      });

      // console.log(res.data);
      if (res.data.data.includes("html")) {
        return res.data.data;
      }

      const parsedData = JSON.parse(res.data.data);
      if (parsedData.status === "failed") {
        throw new Error({ message_TR: parsedData.reason });
      }

      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetExtendByOnlinePay } = extendByOnlinePaySlice.actions;
export default extendByOnlinePaySlice.reducer;
