import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  restaurantStatuses: null,
};

const getRestaurantsStatusSlice = createSlice({
  name: "getRestaurantsStatus",
  initialState: initialState,
  reducers: {
    resetGetRestaurantsStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.restaurantStatuses = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurantsStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.restaurantStatuses = null;
      })
      .addCase(getRestaurantsStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.restaurantStatuses = action.payload;
      })
      .addCase(getRestaurantsStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.restaurantStatuses = null;
      });
  },
});

export const getRestaurantsStatus = createAsyncThunk(
  "Tickets/GetRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetRestaurants`);
      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      // console.log(err);
      const errorMessage = err.message;
      return rejectWithValue({
        message: errorMessage,
        status: err?.response?.status,
      });
    }
  }
);

export const { resetGetRestaurantsStatus } = getRestaurantsStatusSlice.actions;
export default getRestaurantsStatusSlice.reducer;
