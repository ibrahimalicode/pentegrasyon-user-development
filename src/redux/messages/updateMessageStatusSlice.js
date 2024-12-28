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

const updateMessageStatusSlice = createSlice({
  name: "updateMessageStatus",
  initialState: initialState,
  reducers: {
    resetUpdateMessageStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateMessageStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.data = null;
      })
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(updateMessageStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateMessageStatus = createAsyncThunk(
  "Messages/UpdateMessageRecipientIsRead",
  async (data, { rejectWithValue }) => {
    try {
      const results = [];
      for (const message of data) {
        if (!message.isRead) {
          const res = await api.put(
            `${baseURL}Messages/UpdateMessageRecipientIsRead`,
            {},
            {
              params: {
                messageRecipientId: message.messageRecipientId,
                isRead: true,
              },
            }
          );
          results.push({ ...res.data, message });
        }
      }

      // console.log(results);
      return results;
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

export const { resetUpdateMessageStatus } = updateMessageStatusSlice.actions;
export default updateMessageStatusSlice.reducer;
