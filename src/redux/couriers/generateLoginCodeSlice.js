import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  code: null,
};

const generateLoginCodeSlice = createSlice({
  name: "generateLoginCode",
  initialState: initialState,
  reducers: {
    resetgenerateLoginCode: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.code = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(generateLoginCode.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.code = null;
      })
      .addCase(generateLoginCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.code = action.payload;
      })
      .addCase(generateLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.code = null;
      });
  },
});

export const generateLoginCode = createAsyncThunk(
  "Couriers/CreateLoginCode",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${baseURL}Couriers/CreateLoginCode`,
        {},
        {
          params: {},
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

export const { resetgenerateLoginCode } = generateLoginCodeSlice.actions;
export default generateLoginCodeSlice.reducer;
