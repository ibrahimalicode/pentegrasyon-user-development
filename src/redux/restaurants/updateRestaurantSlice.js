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

const updateRestaurantSlice = createSlice({
  name: "updateRestaurant",
  initialState: initialState,
  reducers: {
    resetUpdateRestaurant: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetUpdateRestaurantState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateRestaurant = createAsyncThunk(
  "Restaurants/UpdateRestaurant",
  async (
    {
      restaurantId,
      dealerId,
      userId,
      name,
      phoneNumber,
      city,
      district,
      neighbourhood,
      address,
      latitude,
      longitude,
      isActive,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(
        `${baseURL}Restaurants/UpdateRestaurant`,
        {
          dealerId,
          name,
          phoneNumber,
          city: city.value,
          district: district.value,
          neighbourhood: neighbourhood.value,
          address,
          latitude,
          longitude,
          isActive,
        },
        { params: { restaurantId, userId } }
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetUpdateRestaurant, resetUpdateRestaurantState } =
  updateRestaurantSlice.actions;
export default updateRestaurantSlice.reducer;
