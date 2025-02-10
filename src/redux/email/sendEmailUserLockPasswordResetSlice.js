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

const sendEmailUserLockPasswordResetSlice = createSlice({
  name: "sendEmailUserLockPasswordReset",
  initialState: initialState,
  reducers: {
    restSendEmailUserLockPasswordReset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.smsParameters = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendEmailUserLockPasswordReset.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.smsParameters = null;
      })
      .addCase(sendEmailUserLockPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.smsParameters = action.payload;
      })
      .addCase(sendEmailUserLockPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.smsParameters = null;
      });
  },
});

export const sendEmailUserLockPasswordReset = createAsyncThunk(
  "GeneralVariables/sendEmailUserLockPasswordReset",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Email/sendEmailUserLockPasswordReset`
      );

      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { restSendEmailUserLockPasswordReset } =
  sendEmailUserLockPasswordResetSlice.actions;
export default sendEmailUserLockPasswordResetSlice.reducer;
