import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  smsParameters: null,
};

const sendSMSUserLockPasswordResetSlice = createSlice({
  name: "sendSMSUserLockPasswordReset",
  initialState: initialState,
  reducers: {
    restSendSMSUserLockPasswordReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.smsParameters = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendSMSUserLockPasswordReset.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.smsParameters = null;
      })
      .addCase(sendSMSUserLockPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.smsParameters = action.payload;
      })
      .addCase(sendSMSUserLockPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.smsParameters = null;
      });
  },
});

export const sendSMSUserLockPasswordReset = createAsyncThunk(
  "GeneralVariables/SendSMSUserLockPasswordReset",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}SMS/SendSMSUserLockPasswordReset`);

      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { restSendSMSUserLockPasswordReset } =
  sendSMSUserLockPasswordResetSlice.actions;
export default sendSMSUserLockPasswordResetSlice.reducer;
