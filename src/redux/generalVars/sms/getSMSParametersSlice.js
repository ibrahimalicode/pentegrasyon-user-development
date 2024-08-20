//https://api.pentegrasyon.net:9007/api/v1/CityDistrictNeighbourhood/getSMSParameters

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  smsParameters: null,
};

const getSMSParametersSlice = createSlice({
  name: "getSMSParameters",
  initialState: initialState,
  reducers: {
    resetgetSMSParametersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    restgetSMSParameters: (state) => {
      state.smsParameters = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getSMSParameters.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.smsParameters = null;
      })
      .addCase(getSMSParameters.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.smsParameters = action.payload;
      })
      .addCase(getSMSParameters.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.smsParameters = null;
      });
  },
});

export const getSMSParameters = createAsyncThunk(
  "GeneralVariables/GetSMSParameters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}GeneralVariables/GetSMSParameters`);

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

export const { resetgetSMSParametersState, restgetSMSParameters } =
  getSMSParametersSlice.actions;
export default getSMSParametersSlice.reducer;
