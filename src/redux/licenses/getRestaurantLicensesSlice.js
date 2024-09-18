import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  restaurantLicenses: null,
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
      state.restaurantLicenses = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurantLicenses.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.restaurantLicenses = null;
      })
      .addCase(getRestaurantLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.restaurantLicenses = action.payload;
      })
      .addCase(getRestaurantLicenses.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.restaurantLicenses = null;
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

      // console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetGetRestaurantLicensesState, resetGetRestaurantLicenses } =
  getRestaurantLicensesSlice.actions;
export default getRestaurantLicensesSlice.reducer;
