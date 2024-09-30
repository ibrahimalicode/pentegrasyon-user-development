import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  automationVariables: null,
};

const getTicketAutomationVariableSlice = createSlice({
  name: "getTicketAutomationVariable",
  initialState: initialState,
  reducers: {
    resetGetTicketAutomationVariable: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.automationVariables = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getTicketAutomationVariable.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.automationVariables = null;
      })
      .addCase(getTicketAutomationVariable.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.automationVariables = action.payload;
      })
      .addCase(getTicketAutomationVariable.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.automationVariables = null;
      });
  },
});

export const getTicketAutomationVariable = createAsyncThunk(
  "Tickets/GetTicketAutomationVariable",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Tickets/GetTicketAutomationVariable`
      );

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

export const { resetGetTicketAutomationVariable } =
  getTicketAutomationVariableSlice.actions;
export default getTicketAutomationVariableSlice.reducer;
