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

const adduserInvoiceSlice = createSlice({
  name: "addUserInvoice",
  initialState: initialState,
  reducers: {
    resetaddUserInvoice: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    resetaddUserInvoiceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addUserInvoice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(addUserInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addUserInvoice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const addUserInvoice = createAsyncThunk(
  "Users/addUserInvoice",
  async (
    {
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
      const res = await api.post(`${baseURL}Invoices/AddUserInvoiceAddress`, {
        taxOffice,
        taxNumber,
        title,
        address,
        city: city.label,
        district: district.label,
        neighbourhood: neighbourhood.label,
        tradeRegistryNumber,
        mersisNumber,
      });

      // console.log(res.data);
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

export const { resetaddUserInvoice, resetaddUserInvoiceState } =
  adduserInvoiceSlice.actions;
export default adduserInvoiceSlice.reducer;
