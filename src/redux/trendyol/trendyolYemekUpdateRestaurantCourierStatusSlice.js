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

const trendyolYemekUpdateRestaurantCourierStatusSlice = createSlice({
  name: "trendyolYemekUpdateRestaurantCourierStatus",
  initialState: initialState,
  reducers: {
    resetTrendyolYemekUpdateRestaurantCourierStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(trendyolYemekUpdateRestaurantCourierStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(
        trendyolYemekUpdateRestaurantCourierStatus.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(
        trendyolYemekUpdateRestaurantCourierStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.data = null;
        },
      );
  },
});

export const trendyolYemekUpdateRestaurantCourierStatus = createAsyncThunk(
  "Trendyol/UpdateRestaurantCourierStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}Trendyol/UpdateRestaurantCourierStatus`,
        { ...data },
        { params: { ...data } },
      );

      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  },
);

export const { resetTrendyolYemekUpdateRestaurantCourierStatus } =
  trendyolYemekUpdateRestaurantCourierStatusSlice.actions;
export default trendyolYemekUpdateRestaurantCourierStatusSlice.reducer;
