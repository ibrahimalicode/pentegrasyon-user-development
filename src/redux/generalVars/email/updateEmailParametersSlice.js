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

const updateEmailParametersSlice = createSlice({
  name: "updateEmailParameters",
  initialState: initialState,
  reducers: {
    resetUpdateEmailParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdateEmailParameters: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateEmailParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateEmailParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateEmailParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateEmailParameters = createAsyncThunk(
  "GeneralVariables/UpdateEmailParameters",
  async ({ emailData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}GeneralVariables/UpdateEmailParameters`,
        { ...emailData }
      );

      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetUpdateEmailParametersState, resetUpdateEmailParameters } =
  updateEmailParametersSlice.actions;
export default updateEmailParametersSlice.reducer;
