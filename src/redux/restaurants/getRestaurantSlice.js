//https://api.pentegrasyon.net:9007/api/v1/Users/GetUsers

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";
const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  restaurant: null,
};

const getRestaurantSlice = createSlice({
  name: "getRestaurant",
  initialState: initialState,
  reducers: {
    resetGetRestaurantState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetRestaurant: (state) => {
      state.restaurant = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurant.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.restaurant = null;
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.restaurant = action.payload;
      })
      .addCase(getRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.restaurant = null;
      });
  },
});

export const getRestaurant = createAsyncThunk(
  "Restaurants/GetRestaurantById",
  async ({ restaurantId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Restaurants/GetRestaurantById`, {
        params: {
          restaurantId,
        },
      });

      // console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue({ message: err.response.data.message_TR });
      }
      return rejectWithValue({ message: err.message });
    }
  }
);

export const { resetGetRestaurantState, resetGetRestaurant } =
  getRestaurantSlice.actions;
export default getRestaurantSlice.reducer;
