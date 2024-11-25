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

const yemekSepetiTicketDeliverSlice = createSlice({
  name: "yemekSepetiTicketDeliver",
  initialState: initialState,
  reducers: {
    resetyemekSepetiTicketDeliver: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(yemekSepetiTicketDeliver.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(yemekSepetiTicketDeliver.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(yemekSepetiTicketDeliver.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const yemekSepetiTicketDeliver = createAsyncThunk(
  "YemekSepeti/TicketDeliver",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${baseURL}YemekSepeti/TicketDeliver`,
        {},
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

export const { resetyemekSepetiTicketDeliver } =
  yemekSepetiTicketDeliverSlice.actions;
export default yemekSepetiTicketDeliverSlice.reducer;
