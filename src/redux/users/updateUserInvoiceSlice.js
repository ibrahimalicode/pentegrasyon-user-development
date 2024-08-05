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

const updateUserInvoiceSlice = createSlice({
  name: "updateUserInvoice",
  initialState: initialState,
  reducers: {
    resetUpdateUserInvoice: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetUpdateUserInvoiceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(updateUserInvoice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(updateUserInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateUserInvoice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const updateUserInvoice = createAsyncThunk(
  "Users/updateUserInvoice",
  async (
    {
      userId,
      taxOffice,
      taxNumber,
      title,
      address,
      city,
      district,
      neighbourhood,
      tradeRegistryNumber,
      mersisNumber,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(
        `${baseURL}Invoices/UpdateUserInvoiceAddress`,
        {
          taxOffice,
          taxNumber,
          title,
          address,
          city: city.label,
          district: district.label,
          neighbourhood: neighbourhood.label,
          tradeRegistryNumber,
          mersisNumber,
        },
        {
          params: {
            userId,
          },
        }
      );

      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        throw rejectWithValue(err.response.data);
      }
      throw rejectWithValue({ message_TR: err.message });
    }
  }
);

export const { resetUpdateUserInvoice, resetUpdateUserInvoiceState } =
  updateUserInvoiceSlice.actions;
export default updateUserInvoiceSlice.reducer;
