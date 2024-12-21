import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  compensationData: null,
};

const getOrderCompensationSlice = createSlice({
  name: "getOrderCompensation",
  initialState: initialState,
  reducers: {
    resetGetOrderCompensation: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.compensationData = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getOrderCompensation.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.compensationData = null;
      })
      .addCase(getOrderCompensation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.compensationData = action.payload;
      })
      .addCase(getOrderCompensation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.compensationData = null;
      });
  },
});

export const getOrderCompensation = createAsyncThunk(
  "Tickets/GetTicGetTicketCourierCompensationAssignmentket",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}Tickets/GetTicketCourierCompensationAssignment`,
        { params: { ...data } }
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

export const { resetGetOrderCompensation } = getOrderCompensationSlice.actions;
export default getOrderCompensationSlice.reducer;
