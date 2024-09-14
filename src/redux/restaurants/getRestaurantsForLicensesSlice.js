import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  restaurants: null,
};

const getRestaurantsForLicensesSlice = createSlice({
  name: "getRestaurantsForLicenses",
  initialState: initialState,
  reducers: {
    resetGetRestaurantsForLicenses: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.restaurants = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getRestaurantsForLicenses.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.restaurants = null;
      })
      .addCase(getRestaurantsForLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurantsForLicenses.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.restaurants = null;
      });
  },
});

export const getRestaurantsForLicenses = createAsyncThunk(
  "Restaurants/GetRestaurantsForLicenses",
  async (licenses, { rejectWithValue }) => {
    try {
      const uniqueRestaurantIds = [
        ...new Set(licenses.map((license) => license.restaurantId)),
      ];

      const restaurantPromises = uniqueRestaurantIds.map((restaurantId) =>
        api
          .get(`${baseURL}Restaurants/GetRestaurantById`, {
            params: {
              restaurantId,
            },
          })
          .then((response) => response.data.data)
      );

      const restaurants = await Promise.all(restaurantPromises);

      const restaurantMap = restaurants.reduce((acc, restaurant) => {
        acc[restaurant.id] = restaurant;
        return acc;
      }, {});

      const updatedLicenses = licenses.map((license) => {
        const restaurant = restaurantMap[license.restaurantId];
        return {
          ...license,
          restaurantName: restaurant.name,
          restaurantId: restaurant.id,
        };
      });

      return updatedLicenses;
    } catch (err) {
      console.error(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetGetRestaurantsForLicenses } =
  getRestaurantsForLicensesSlice.actions;
export default getRestaurantsForLicensesSlice.reducer;
