import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  restorantLicenses: null,
};

const getRestaurantLicensesSlice = createSlice({
  name: "getRestaurantLicenses",
  initialState: initialState,
  reducers: {
    resetGetRestaurantLicensesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetRestaurantLicenses: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.restorantLicenses = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurantLicenses.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.restorantLicenses = null;
      })
      .addCase(getRestaurantLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.restorantLicenses = action.payload;
      })
      .addCase(getRestaurantLicenses.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.restorantLicenses = null;
      });
  },
});

export const getRestaurantLicenses = createAsyncThunk(
  "Licenses/GetLicensesByRestaurantId",
  async (
    { restaurantId, pageNumber = null, pageSize = null },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(
        `${baseURL}Licenses/GetLicensesByRestaurantId`,
        {
          params: {
            restaurantId,
            pageNumber,
            pageSize,
          },
        }
      );

      console.log(res.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetGetRestaurantLicensesState, resetGetRestaurantLicenses } =
  getRestaurantLicensesSlice.actions;
export default getRestaurantLicensesSlice.reducer;
