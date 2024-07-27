import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const verifyCodeSlice = createSlice({
  name: "VerifyCode",
  initialState: initialState,
  reducers: {
    resetVerifyCodeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export const verifyCode = createAsyncThunk(
  "Auth/VerifyCode",
  async ({ phoneNumber, verificationCode }) => {
    console.log(phoneNumber, verificationCode);
    try {
      const res = await api.get(
        `${baseURL}/Verify/VerifyUserWithVerificationCode`,
        {
          params: {
            phoneNumber,
            verificationCode,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message_TR) {
        throw err.response.data.message_TR;
      }
      throw err.message;
    }
  }
);

export const { resetVerifyCodeState } = verifyCodeSlice.actions;
export default verifyCodeSlice.reducer;
