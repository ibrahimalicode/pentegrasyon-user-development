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

const getirYemekUpdateRestaurantCourierStatusSlice = createSlice({
  name: "getirYemekUpdateRestaurantCourierStatus",
  initialState: initialState,
  reducers: {
    resetgetirYemekUpdateRestaurantCourierStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getirYemekUpdateRestaurantCourierStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(
        getirYemekUpdateRestaurantCourierStatus.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(
        getirYemekUpdateRestaurantCourierStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          state.data = null;
        }
      );
  },
});

export const getirYemekUpdateRestaurantCourierStatus = createAsyncThunk(
  "GetirYemek/UpdateRestaurantCourierStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}GetirYemek/UpdateRestaurantCourierStatus`,
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

export const { resetgetirYemekUpdateRestaurantCourierStatus } =
  getirYemekUpdateRestaurantCourierStatusSlice.actions;
export default getirYemekUpdateRestaurantCourierStatusSlice.reducer;
