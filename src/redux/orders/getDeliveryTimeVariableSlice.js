import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const getDeliveryTimeVariableSlice = createSlice({
  name: "getDeliveryTimeVariable",
  initialState: initialState,
  reducers: {
    resetgetDeliveryTimeVariable: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getDeliveryTimeVariable.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(getDeliveryTimeVariable.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getDeliveryTimeVariable.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const getDeliveryTimeVariable = createAsyncThunk(
  "Tickets/GetDeliveryTimeVariable",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetDeliveryTimeVariable`);

      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      // console.log(err);
      const errorMessage = err.message;
      return rejectWithValue({
        message: errorMessage,
        status: err?.response?.status,
      });
    }
  }
);

export const { resetgetDeliveryTimeVariable } =
  getDeliveryTimeVariableSlice.actions;
export default getDeliveryTimeVariableSlice.reducer;
