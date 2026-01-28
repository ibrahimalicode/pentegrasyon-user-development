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

const trendyolYemekUpdateRestaurantStatusSlice = createSlice({
  name: "trendyolYemekUpdateRestaurantStatus",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekUpdateRestaurantStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekUpdateRestaurantStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(
        trendyolYemekUpdateRestaurantStatus.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(
        trendyolYemekUpdateRestaurantStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.data = null;
        },
      );
  },
});

export const trendyolYemekUpdateRestaurantStatus = createAsyncThunk(
  "Trendyol/UpdateRestaurantStatus",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await api.put(
        `${baseURL}Trendyol/UpdateRestaurantStatus`,
        { ...data },
        { params: { ...data } },
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekUpdateRestaurantStatus } =
  trendyolYemekUpdateRestaurantStatusSlice.actions;
export default trendyolYemekUpdateRestaurantStatusSlice.reducer;
