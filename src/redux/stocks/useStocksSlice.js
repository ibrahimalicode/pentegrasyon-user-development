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

const useStocksSlice = createSlice({
  name: "useStocks",
  initialState: initialState,
  reducers: {
    resetUseStocks: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetUseStocksState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(_useStocks.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(_useStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(_useStocks.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const _useStocks = createAsyncThunk(
  "LicenseStock/UseLicenseStock",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}LicenseStock/UseLicenseStock`,
        {},
        { params }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetUseStocks, resetUseStocksState } = useStocksSlice.actions;
export default useStocksSlice.reducer;
