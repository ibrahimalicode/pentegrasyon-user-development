import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const trendyolYemekGetRestaurantsSlice = createSlice({
  name: "trendyolYemekGetRestaurants",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekGetRestaurants: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekGetRestaurants.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(trendyolYemekGetRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(trendyolYemekGetRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const trendyolYemekGetRestaurants = createAsyncThunk(
  "Trendyol/GetRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Trendyol/GetRestaurants`);

      // console.log(res);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekGetRestaurants } =
  trendyolYemekGetRestaurantsSlice.actions;
export default trendyolYemekGetRestaurantsSlice.reducer;
