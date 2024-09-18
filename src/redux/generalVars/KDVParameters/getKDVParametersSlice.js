//https://api.pentegrasyon.net:9007/api/v1/CityDistrictNeighbourhood/getKDVParameters

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  KDVParameters: null,
};

const getKDVParametersSlice = createSlice({
  name: "getKDVParameters",
  initialState: initialState,
  reducers: {
    resetGetKDVParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetKDVParameters: (state) => {
      state.KDVParameters = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getKDVParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.KDVParameters = null;
      })
      .addCase(getKDVParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.KDVParameters = action.payload;
      })
      .addCase(getKDVParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.KDVParameters = null;
      });
  },
});

export const getKDVParameters = createAsyncThunk(
  "GeneralVariables/GetKDVParameters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}GeneralVariables/GetKDVParameters`);

      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetGetKDVParametersState, resetGetKDVParameters } =
  getKDVParametersSlice.actions;
export default getKDVParametersSlice.reducer;
