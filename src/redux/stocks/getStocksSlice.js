import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  licenses: null,
};

const getStocksSlice = createSlice({
  name: "getStocks",
  initialState: initialState,
  reducers: {
    resetGetStocksState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetStocks: (state) => {
      state.stocks = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getStocks.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.stocks = null;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.stocks = null;
      });
  },
});

export const getStocks = createAsyncThunk(
  "LicenseStock/GetUserLicenseStocks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}LicenseStock/GetUserLicenseStocks`, {
        params: data,
      });

      console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetGetStocksState, resetGetStocks } = getStocksSlice.actions;
export default getStocksSlice.reducer;
