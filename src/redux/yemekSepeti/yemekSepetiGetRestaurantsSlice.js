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

const yemekSepetiGetRestaurantsSlice = createSlice({
  name: "yemekSepetiGetRestaurants",
  initialState: initialState,
  reducers: {
    resetYemekSepetiGetRestaurants: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiGetRestaurants.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(yemekSepetiGetRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(yemekSepetiGetRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const yemekSepetiGetRestaurants = createAsyncThunk(
  "YemekSepeti/GetRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}YemekSepeti/GetRestaurants`);

      // console.log(res);
      return res.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetYemekSepetiGetRestaurants } =
  yemekSepetiGetRestaurantsSlice.actions;
export default yemekSepetiGetRestaurantsSlice.reducer;
