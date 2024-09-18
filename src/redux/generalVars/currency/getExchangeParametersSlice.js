import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  exchangeParameter: null,
};

const getExchangeParametersSlice = createSlice({
  name: "getExchangeParameter",
  initialState: initialState,
  reducers: {
    resetgetExchangeParameter: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.exchangeParameter = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getExchangeParameter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.exchangeParameter = null;
      })
      .addCase(getExchangeParameter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.exchangeParameter = action.payload;
      })
      .addCase(getExchangeParameter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.exchangeParameter = null;
      });
  },
});

export const getExchangeParameter = createAsyncThunk(
  "GeneralVariables/GetExchangeParameters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${baseURL}GeneralVariables/GetExchangeParameters`
      );

      return response.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetgetExchangeParameter } = getExchangeParametersSlice.actions;
export default getExchangeParametersSlice.reducer;
