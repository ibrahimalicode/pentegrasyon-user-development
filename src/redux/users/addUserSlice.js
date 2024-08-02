import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const addUserSlice = createSlice({
  name: "addUser",
  initialState: initialState,
  reducers: {
    resetaddUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export const addUser = createAsyncThunk(
  "Auth/AddUser",
  async (
    {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      password,
      userInvoiceAddressDTO,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`${baseURL}Users/AddUser`, {
        params: {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          password,
          userInvoiceAddressDTO,
        },
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

export const { resetaddUserState } = addUserSlice.actions;
export default addUserSlice.reducer;
