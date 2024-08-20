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

const updateKDVParametersSlice = createSlice({
  name: "updateKDVParameters",
  initialState: initialState,
  reducers: {
    resetUpdateKDVParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetUpdateKDVParameters: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateKDVParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateKDVParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateKDVParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateKDVParameters = createAsyncThunk(
  "GeneralVariables/UpdateKDVParameters",
  async ({ kdvData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}GeneralVariables/UpdateKDVParameters`,
        { ...kdvData }
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

export const { resetUpdateKDVParametersState, resetUpdateKDVParameters } =
  updateKDVParametersSlice.actions;
export default updateKDVParametersSlice.reducer;
