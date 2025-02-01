import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const registerSlice = createSlice({
  name: "registerUser",
  initialState: initialState,
  reducers: {
    resetRgister: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetRgisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const registerUser = createAsyncThunk(
  "Auth/registerUser",
  async (
    { email, phoneNumber, password, firstName, lastName, city, district },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${baseURL}Auth/UserRegister`, {
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        city,
        district,
      });

      console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetRgister, resetRgisterState } = registerSlice.actions;
export default registerSlice.reducer;
