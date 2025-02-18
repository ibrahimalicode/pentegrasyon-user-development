//deleteRestaurantByMarketplaceRestaurantIdSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const deleteRestaurantByMarketplaceRestaurantIdSlice = createSlice({
  name: "deleteRestaurantByMarketplaceRestaurantId",
  initialState: initialState,
  reducers: {
    resetDeleteRestaurantByMarketplaceRestaurantId: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(deleteRestaurantByMarketplaceRestaurantId.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteRestaurantByMarketplaceRestaurantId.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(
        deleteRestaurantByMarketplaceRestaurantId.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );
  },
});

export const deleteRestaurantByMarketplaceRestaurantId = createAsyncThunk(
  "MarketplaceRestaurants/DeleteRestaurantByMarketplaceRestaurantId",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.delete(
        `${baseURL}MarketplaceRestaurants/DeleteRestaurantByMarketplaceRestaurantId`,
        {
          params: data,
        }
      );

      //console.log(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetDeleteRestaurantByMarketplaceRestaurantId } =
  deleteRestaurantByMarketplaceRestaurantIdSlice.actions;
export default deleteRestaurantByMarketplaceRestaurantIdSlice.reducer;
