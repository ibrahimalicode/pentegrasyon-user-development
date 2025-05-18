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

const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState: initialState,
  reducers: {
    resetGetOrdersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetOrders: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.orders = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.orders = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.orders = null;
      });
  },
});

export const getOrders = createAsyncThunk(
  "Tickets/GetTickets",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseURL}Tickets/GetTickets`, {
        params: data,
      });

      // console.log(res.data);
      const orders = res.data.data;

      const withCourier = orders.filter(
        (O) =>
          O.courierTypeId === 0 &&
          O.courierId &&
          O.courierId !== "00000000-0000-0000-0000-000000000000"
      );

      const uniqueCourierIds = [
        ...new Set(withCourier.map((o) => o.courierId)),
      ];

      const courierMap = new Map();

      await Promise.all(
        uniqueCourierIds.map(async (id) => {
          try {
            const courierRes = await api.get(
              `${baseURL}Couriers/GetCourierById`,
              {
                params: { courierId: id },
              }
            );
            courierMap.set(id, courierRes.data?.data);
          } catch (err) {
            console.error(`Failed to fetch courier with ID ${id}`, err);
          }
        })
      );

      const enrichedOrders = orders.map((order) => {
        const courierData = courierMap.get(order.courierId);
        if (order.courierTypeId === 0 && order.courierId && courierData) {
          return {
            ...order,
            courier: {
              ...order?.courier,
              ...courierData,
            },
          };
        }
        return order;
      });

      return {
        ...res.data,
        data: enrichedOrders,
      };
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

export const { resetGetOrdersState, resetGetOrders } = getOrdersSlice.actions;
export default getOrdersSlice.reducer;
