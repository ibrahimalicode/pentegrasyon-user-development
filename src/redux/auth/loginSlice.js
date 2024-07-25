import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_PORT = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  loading: false,
  success: false,
  error: null,
  sessionId: null,
};

const loginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.sessionId = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.sessionId = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
        state.sessionId = null;
      });
  },
});

export const login = createAsyncThunk(
  "Auth/UserLogin",
  async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${BACKEND_PORT}/api/v1/Auth/UserLogin`,
        {
          emailOrPhoneNumber: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const KEY = import.meta.env.VITE_LOACAL_KEY;
      localStorage.setItem(`${KEY}`, JSON.stringify(res.data));
      return res.data.sessionId;
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message_TR) {
        throw err.response.data.message_TR;
      }
      throw err.message;
    }
  }
);

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
