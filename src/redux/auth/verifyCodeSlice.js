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
      .addCase(codeVerification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(codeVerification.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(codeVerification.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export const codeVerification = createAsyncThunk(
  "Auth/VerifyCode",
  async ({ phoneNumberOrEmail, verificationCode }) => {
    console.log(phoneNumberOrEmail, verificationCode);
    try {
      const res = await api.get(`${baseURL}Auth/Verify`, {
        params: {
          phoneNumberOrEmail,
          verificationCode,
        },
      });

      let data;
      const KEY = import.meta.env.VITE_LOCAL_KEY;
      if (res?.data?.data?.length > 0) {
        data = JSON.parse(res.data.data);
      } else {
        data = res.data;
      }
      localStorage.setItem(`${KEY}`, JSON.stringify(data));

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
