import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const updateAdminDataSlice = createSlice({
  name: "updateAdminData",
  initialState: initialState,
  reducers: {
    resetUpdateAdmin: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetUpdateAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateAdminData.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(updateAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateAdminData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateAdminData = createAsyncThunk(
  "Managers/UpdateManager",
  async (
    { roleId, email, phoneNumber, firstName, lastName },
    { rejectWithValue }
  ) => {
    console.log(roleId, email, phoneNumber, firstName, lastName);
    try {
      const res = await api.put(`${baseURL}Managers/UpdateManager`, {
        roleId,
        email,
        phoneNumber,
        firstName,
        lastName,
      });

      // console.log(res.data);
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

export const { resetUpdateAdmin, resetUpdateAdminState } =
  updateAdminDataSlice.actions;
export default updateAdminDataSlice.reducer;
