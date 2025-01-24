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

const migrosYemekUpdateRestaurantCourierStatusSlice = createSlice({
  name: "migrosYemekUpdateRestaurantCourierStatus",
  initialState: initialState,
  reducers: {
    resetMigrosYemekUpdateRestaurantCourierStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(migrosYemekUpdateRestaurantCourierStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(
        migrosYemekUpdateRestaurantCourierStatus.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(
        migrosYemekUpdateRestaurantCourierStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.data = null;
        }
      );
  },
});

export const migrosYemekUpdateRestaurantCourierStatus = createAsyncThunk(
  "MigrosYemek/UpdateRestaurantCourierStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}MigrosYemek/UpdateRestaurantCourierStatus`,
        { ...data },
        { params: { ...data } }
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
  }
);

export const { resetMigrosYemekUpdateRestaurantCourierStatus } =
  migrosYemekUpdateRestaurantCourierStatusSlice.actions;
export default migrosYemekUpdateRestaurantCourierStatusSlice.reducer;
