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
        state.error = action.payload;
      });
  },
});

export const changePassword = createAsyncThunk(
  "Auth/changePassword",
  async ({ newPassword, newPasswordConfirm }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${baseURL}Users/UpdateUserPasswordByUserId`, {
        newPassword,
        newPasswordConfirm,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetChangePassword } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
