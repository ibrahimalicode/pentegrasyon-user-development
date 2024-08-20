import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const updateExchangeParametersSlice = createSlice({
  name: "updateExchangeParameters",
  initialState: initialState,
  reducers: {
    resetUpdateExchangeParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdateExchangeParameters: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateExchangeParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateExchangeParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateExchangeParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateExchangeParameters = createAsyncThunk(
  "GeneralVariables/UpdateExchangeParameters",
  async ({ exchangeData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}GeneralVariables/UpdateExchangeParameters`,
        { ...exchangeData }
      );

      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const {
  resetUpdateExchangeParametersState,
  resetUpdateExchangeParameters,
} = updateExchangeParametersSlice.actions;
export default updateExchangeParametersSlice.reducer;
