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

const yemekSepetiUpdateRestaurantStatusSlice = createSlice({
  name: "yemekSepetiUpdateRestaurantStatus",
  initialState: initialState,
  reducers: {
    resetYemekSepetiUpdateRestaurantStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiUpdateRestaurantStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(yemekSepetiUpdateRestaurantStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(yemekSepetiUpdateRestaurantStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const yemekSepetiUpdateRestaurantStatus = createAsyncThunk(
  "YemekSepeti/UpdateRestaurantStatus",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await api.put(
        `${baseURL}YemekSepeti/UpdateRestaurantStatus`,
        { ...data },
        { params: { ...data } }
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
  }
);

export const { resetYemekSepetiUpdateRestaurantStatus } =
  yemekSepetiUpdateRestaurantStatusSlice.actions;
export default yemekSepetiUpdateRestaurantStatusSlice.reducer;
