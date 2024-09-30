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

const updateTicketAutomationVariableSlice = createSlice({
  name: "updateTicketAutomationVariable",
  initialState: initialState,
  reducers: {
    resetUpdateTicketAutomationVariable: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.automationVariables = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateTicketAutomationVariable.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.automationVariables = null;
      })
      .addCase(updateTicketAutomationVariable.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.automationVariables = action.payload;
      })
      .addCase(updateTicketAutomationVariable.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.automationVariables = null;
      });
  },
});

export const updateTicketAutomationVariable = createAsyncThunk(
  "Tickets/UpdateTicketAutomationVariable",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}Tickets/UpdateTicketAutomationVariable`,
        { ...data },
        { params: { ...data } }
      );

      // console.log(res.data);
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

export const { resetUpdateTicketAutomationVariable } =
  updateTicketAutomationVariableSlice.actions;
export default updateTicketAutomationVariableSlice.reducer;
