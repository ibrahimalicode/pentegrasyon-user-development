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

const updateIntegrationInformationSlice = createSlice({
  name: "updateIntegrationInformation",
  initialState: initialState,
  reducers: {
    resetUpdateIntegrationInformation: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateIntegrationInformation.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(updateIntegrationInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateIntegrationInformation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateIntegrationInformation = createAsyncThunk(
  "Licenses/UpdateGetirYemekIntegrationInformation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}IntegrationInformations/UpdateGetirYemekIntegrationInformation`,
        { ...data },
        { params: data }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetUpdateIntegrationInformation } =
  updateIntegrationInformationSlice.actions;
export default updateIntegrationInformationSlice.reducer;
