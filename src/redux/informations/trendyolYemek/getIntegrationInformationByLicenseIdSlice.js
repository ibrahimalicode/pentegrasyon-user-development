import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  infoData: null,
};

const getIntegrationInformationByLicenseIdSlice = createSlice({
  name: "getTrendyolYemekIntegrationInformationByLicenseId",
  initialState: initialState,
  reducers: {
    resetGetIntegrationInformationByLicenseId: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.infoData = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getIntegrationInformationByLicenseId.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.infoData = null;
      })
      .addCase(
        getIntegrationInformationByLicenseId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.infoData = action.payload;
        }
      )
      .addCase(
        getIntegrationInformationByLicenseId.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.infoData = null;
        }
      );
  },
});

export const getIntegrationInformationByLicenseId = createAsyncThunk(
  "IntegrationInformations/GetTrendyolIntegrationInformationByLicenseId",
  async (licenseId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}IntegrationInformations/GetTrendyolIntegrationInformationByLicenseId`,
        { params: { licenseId } }
      );

      // console.log(res);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetGetIntegrationInformationByLicenseId } =
  getIntegrationInformationByLicenseIdSlice.actions;
export default getIntegrationInformationByLicenseIdSlice.reducer;
