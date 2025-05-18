import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  orders: null,
};

const getCouriersForOrdersSlice = createSlice({
  name: "getCouriersForOrders",
  initialState: initialState,
  reducers: {
    resetgetCouriersForOrders: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.orders = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getCouriersForOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.orders = null;
      })
      .addCase(getCouriersForOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.orders = action.payload;
      })
      .addCase(getCouriersForOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.orders = null;
      });
  },
});

export const getCouriersForOrders = createAsyncThunk(
  "Tickets/GetCouriersForTickets",
  async (orders, { rejectWithValue }) => {
    try {
      const withCourier = orders.filter(
        (O) =>
          O.courierTypeId === 0 &&
          O.courierId &&
          O.courierId !== "00000000-0000-0000-0000-000000000000"
      );

      const enriched = await Promise.all(
        withCourier.map(async (O) => {
          try {
            const res = await api.get(`${baseURL}Couriers/GetCourierById`, {
              params: { courierId: O.courierId },
            });

            return {
              ...O,
              courier: {
                ...O?.courier,
                ...res.data?.data, // adjust based on actual response structure
              },
            };
          } catch (error) {
            console.error(
              `Failed to fetch courier for ID: ${O.courierId}`,
              error
            );
            return O; // fallback to original
          }
        })
      );

      const updatedOrders = orders.map((order) => {
        const match = enriched.find((e) => e.id === order.id);
        return match || order;
      });

      return updatedOrders;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const { resetgetCouriersForOrders } = getCouriersForOrdersSlice.actions;
export default getCouriersForOrdersSlice.reducer;
