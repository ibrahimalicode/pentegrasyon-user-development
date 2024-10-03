import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const addCourierSlice = createSlice({
  name: "addCourier",
  initialState: initialState,
  reducers: {
    resetaddCourier: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addCourier.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(addCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(addCourier.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const addCourier = createAsyncThunk(
  "Couriers/AddCourier",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}Couriers/AddCourier`,
        { ...data },
        {
          params: {
            ...data,
          },
        }
      );

      // console.log(res.data);
      return res.data.data;
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const { resetaddCourier } = addCourierSlice.actions;
export default addCourierSlice.reducer;
