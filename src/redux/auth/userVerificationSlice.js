//userVerificationSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const userVerificationSlice = createSlice({
  name: "userVerification",
  initialState: initialState,
  reducers: {
    resetUserVerification: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(userVerification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.sessionId = null;
      })
      .addCase(userVerification.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(userVerification.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const userVerification = createAsyncThunk(
  "Auth/verifyUser",
  async ({ phoneNumber, isEmail = false }, { rejectWithValue }) => {
    const API = isEmail
      ? `${baseURL}Email/SendEmailUserVerify`
      : `${baseURL}SMS/SendSMSUserVerify`;
    try {
      const res = await api.get(API, {
        params: {
          phoneNumber,
        },
      });
      console.log(res.data);
      const KEY = import.meta.env.VITE_LOCAL_KEY;
      localStorage.setItem(`${KEY}`, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message_TR) {
        throw rejectWithValue(err.response.data);
      }
      throw err.message;
    }
  }
);

export const { resetUserVerification } = userVerificationSlice.actions;
export default userVerificationSlice.reducer;
