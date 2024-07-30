import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const baseURL = import.meta.env.VITE_BASE_URL;

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
        state.error = action.payload;
        state.sessionId = null;
      });
  },
});

export const login = createAsyncThunk(
  "Auth/UserLogin",
  async (
    { email: emailOrPhoneNumber, password, role },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        `${baseURL}Auth/${role === "admin" ? "ManagerLogin" : "UserLogin"}`,
        {
          emailOrPhoneNumber,
          password,
        }
      );
      //console.log(res.data);
      const KEY = import.meta.env.VITE_LOCAL_KEY;
      localStorage.setItem(`${KEY}`, JSON.stringify(res.data));
      return res.data.sessionId;
    } catch (err) {
      console.log(err.response.data);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw err.message;
    }
  }
);

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
