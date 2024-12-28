import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  messages: null,
};

const getMessagesSlice = createSlice({
  name: "getMessages",
  initialState: initialState,
  reducers: {
    resetGetMessages: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.messages = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.messages = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.messages = null;
      });
  },
});

export const getMessages = createAsyncThunk(
  "Messages/GetMessagesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Messages/GetMessagesByUser`);

      // console.log(res.data);
      return res.data;
    } catch (err) {
      // console.log(err);
      const errorMessage = err.message;
      return rejectWithValue({
        message: errorMessage,
        status: err?.response?.status,
      });
    }
  }
);

export const { resetGetMessages } = getMessagesSlice.actions;
export default getMessagesSlice.reducer;
