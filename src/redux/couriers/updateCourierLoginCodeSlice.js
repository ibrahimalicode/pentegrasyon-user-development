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

const updateCourierLoginCodeSlice = createSlice({
  name: "updateCourierLoginCode",
  initialState: initialState,
  reducers: {
    resetUpdateCourierLoginCode: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateCourierLoginCode.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateCourierLoginCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateCourierLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateCourierLoginCode = createAsyncThunk(
  "Couriers/UpdateCourierLoginCode",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await api.put(
        `${baseURL}Couriers/UpdateCourierLoginCode`,
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

export const { resetUpdateCourierLoginCode } =
  updateCourierLoginCodeSlice.actions;
export default updateCourierLoginCodeSlice.reducer;
