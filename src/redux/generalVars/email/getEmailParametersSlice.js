//https://api.pentegrasyon.net:9007/api/v1/CityDistrictNeighbourhood/getEmailParameters

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  emailParameters: null,
};

const getEmailParametersSlice = createSlice({
  name: "getEmailParameters",
  initialState: initialState,
  reducers: {
    resetGetEmailParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    restGetEmailParameters: (state) => {
      state.emailParameters = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getEmailParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.emailParameters = null;
      })
      .addCase(getEmailParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.emailParameters = action.payload;
      })
      .addCase(getEmailParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.emailParameters = null;
      });
  },
});

export const getEmailParameters = createAsyncThunk(
  "GeneralVariables/GetEmailParameters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${baseURL}GeneralVariables/GetEmailParameters`
      );

      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetGetEmailParametersState, restGetEmailParameters } =
  getEmailParametersSlice.actions;
export default getEmailParametersSlice.reducer;
