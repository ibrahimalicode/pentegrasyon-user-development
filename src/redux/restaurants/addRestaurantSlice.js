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

const addRestaurantSlice = createSlice({
  name: "addRestaurant",
  initialState: initialState,
  reducers: {
    resetAddRestaurant: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetAddRestaurantState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const addRestaurant = createAsyncThunk(
  "Restaurants/AddRestaurant",
  async (
    {
      name,
      phoneNumber,
      latitude,
      longitude,
      city,
      district,
      neighbourhood,
      address,
      isActive,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`${baseURL}Restaurants/AddRestaurant`, {
        name,
        phoneNumber,
        latitude,
        longitude,
        city: city.value,
        district: district.value,
        neighbourhood: neighbourhood.value,
        address,
        isActive,
      });

      // console.log(res);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetAddRestaurant, resetAddRestaurantState } =
  addRestaurantSlice.actions;
export default addRestaurantSlice.reducer;
