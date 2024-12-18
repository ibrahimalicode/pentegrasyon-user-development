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

const getAutomationVariablesSlice = createSlice({
  name: "getAutomationVariables",
  initialState: initialState,
  reducers: {
    resetGetAutomationVariables: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAutomationVariables.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(getAutomationVariables.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getAutomationVariables.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const getAutomationVariables = createAsyncThunk(
  "Tickets/GetAutomationVariables",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetAutomationVariables`);

      // console.log(res.data.data);
      return res.data;
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

export const { resetGetAutomationVariables } =
  getAutomationVariablesSlice.actions;
export default getAutomationVariablesSlice.reducer;
