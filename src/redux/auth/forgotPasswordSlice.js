import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPasswordWithPhone",
  initialState: initialState,
  reducers: {
    resetForgotPassword: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(forgotPasswordWithPhone.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.sessionId = null;
      })
      .addCase(forgotPasswordWithPhone.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(forgotPasswordWithPhone.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export const forgotPasswordWithPhone = createAsyncThunk(
  "Auth/SendSMSPasswordReset",
  async ({ phoneNumber }) => {
    console.log(phoneNumber);
    try {
      const res = await api.get(`${baseURL}/SMS/SendSMSPasswordReset`, {
        params: {
          phoneNumber,
        },
      });
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

export const forgotPasswordWithEmail = createAsyncThunk(
  "Auth/SendEmailPasswordReset",
  async ({ toAddress }) => {
    try {
      const res = await api.get(`${baseURL}/Email/SendEmailPasswordReset`, {
        params: {
          toAddress,
        },
      });
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

export const { resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
