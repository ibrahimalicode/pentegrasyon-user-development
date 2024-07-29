import {
  createSlice,
  asyncThunkCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: initialState,
  reducers: {
    resetChangePassword: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export const changePassword = createAsyncThunk(
  "Auth/changePassword",
  async ({ newPassword, newPasswordConfirm }) => {
    try {
      const res = await api.put(`${baseURL}Users/UpdateUserPasswordByUserId`, {
        newPassword,
        newPasswordConfirm,
      });

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

export const { resetChangePassword } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
