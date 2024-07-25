import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_PORT = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  loading: false,
  success: false,
  error: null,
};

const verifyCodeSlice = createSlice({
  name: "verifyCode",
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

  async ({ phone, code }) => {
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/api/v1/Verify/VerifyCode`,
        {
          emailOrPhoneNumber: phone,
          verificationCode: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
