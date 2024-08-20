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

const updateSMSParametersSlice = createSlice({
  name: "updateSMSParameter",
  initialState: initialState,
  reducers: {
    resetupdateSMSParameterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetupdateSMSParameter: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateSMSParameter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateSMSParameter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateSMSParameter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateSMSParameter = createAsyncThunk(
  "GeneralVariables/UpdateSMSParameters",
  async ({ smsData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}GeneralVariables/UpdateSMSParameters`,
        { ...smsData }
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

export const { resetupdateSMSParameterState, resetupdateSMSParameter } =
  updateSMSParametersSlice.actions;
export default updateSMSParametersSlice.reducer;
