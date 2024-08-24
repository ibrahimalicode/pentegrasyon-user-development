import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;
const PAYTRURL = import.meta.env.VITE_PAYTR_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  context: null,
};

const getContextSlice = createSlice({
  name: "getContext",
  initialState: initialState,
  reducers: {
    resetGetContextState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetContext: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.context = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getContext.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.context = null;
      })
      .addCase(getContext.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.context = action.payload;
      })
      .addCase(getContext.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.context = null;
      });
  },
});

export const getContext = createAsyncThunk(
  "PayTR/GetContext",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${PAYTRURL}context`);

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

export const { resetGetContextState, resetGetContext } =
  getContextSlice.actions;
export default getContextSlice.reducer;
