import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  adverts: null,
};

const getAdvertsSlice = createSlice({
  name: "getAdverts",
  initialState: initialState,
  reducers: {
    resetGetAdverts: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.adverts = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAdverts.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.adverts = null;
      })
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.adverts = action.payload;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.adverts = null;
      });
  },
});

export const getAdverts = createAsyncThunk(
  "Adverts/GetAdvertsDisplay",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${baseURL}Adverts/GetAdvertsDisplay`);

      return response.data.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetGetAdverts } = getAdvertsSlice.actions;
export default getAdvertsSlice.reducer;
