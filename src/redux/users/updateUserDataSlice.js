import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const updateUserDataSlice = createSlice({
  name: "updateUserData",
  initialState: initialState,
  reducers: {
    resetUpdateUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetUpdateUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
        state.data = null;
      });
  },
});

export const updateUserData = createAsyncThunk(
  "Users/updateUserData",
  async ({
    dealerId,
    email,
    phoneNumber,
    firstName,
    lastName,
    city,
    district,
  }) => {
    try {
      const res = await axios.post(`${baseURL}Users/UpdateUser`, {
        params: {
          dealerId,
          email,
          phoneNumber,
          firstName,
          lastName,
          city,
          district,
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

export const { resetUpdateUser, resetUpdateUserState } =
  updateUserDataSlice.actions;
export default updateUserDataSlice.reducer;
