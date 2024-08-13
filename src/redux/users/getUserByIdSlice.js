//https://api.pentegrasyon.net:9007/api/v1/User/GetUser

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  user: null,
};

const getUserByIdSlice = createSlice({
  name: "getUser",
  initialState: initialState,
  reducers: {
    resetgetUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetgetUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const getUser = createAsyncThunk(
  "User/GetUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Users/GetUserById`, {
        params: {
          userId,
        },
      });

      //console.log(res);
      return res?.data?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetgetUserState, resetgetUser } = getUserByIdSlice.actions;
export default getUserByIdSlice.reducer;
