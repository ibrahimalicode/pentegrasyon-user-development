import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const addIntegrationInformationSlice = createSlice({
  name: "addGetirYemekIntegrationInformation",
  initialState: initialState,
  reducers: {
    resetAddIntegrationInformation: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addIntegrationInformation.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(addIntegrationInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addIntegrationInformation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const addIntegrationInformation = createAsyncThunk(
  "IntegrationInformations/AddGetirYemekIntegrationInformation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}IntegrationInformations/AddGetirYemekIntegrationInformation`,
        { ...data }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({
        message: errorMessage,
        data: err?.response?.data?.data,
      });
    }
  }
);

export const { resetAddIntegrationInformation } =
  addIntegrationInformationSlice.actions;
export default addIntegrationInformationSlice.reducer;
