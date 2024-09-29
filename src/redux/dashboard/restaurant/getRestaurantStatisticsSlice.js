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

const getRestaurantStatisticsSlice = createSlice({
  name: "getRestaurantStatistics",
  initialState: initialState,
  reducers: {
    resetgetRestaurantStatistics: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurantStatistics.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(getRestaurantStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getRestaurantStatistics.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const getRestaurantStatistics = createAsyncThunk(
  "Statistics/GetRestaurantStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${baseURL}Statistics/GetRestaurantStatistics`
      );

      return response.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetgetRestaurantStatistics } =
  getRestaurantStatisticsSlice.actions;
export default getRestaurantStatisticsSlice.reducer;
