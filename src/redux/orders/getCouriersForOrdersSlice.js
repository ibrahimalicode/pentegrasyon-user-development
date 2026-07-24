import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getCouriersForOrders",
  actionType: "Tickets/GetCouriersForTickets",
  dataKey: "orders",
  request: async (orders) => {
    const withCourier = orders.filter(
      (O) =>
        O.courierTypeId === 0 &&
        O.courierId &&
        O.courierId !== "00000000-0000-0000-0000-000000000000"
    );

    const enriched = await Promise.all(
      withCourier.map(async (O) => {
        try {
          const res = await api.get("Couriers/GetCourierById", {
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
          console.error(`Failed to fetch courier for ID: ${O.courierId}`, error);
          return O; // fallback to original
        }
      })
    );

    const updatedOrders = orders.map((order) => {
      const match = enriched.find((e) => e.id === order.id);
      return match || order;
    });

    return updatedOrders;
  },
});

export const getCouriersForOrders = thunk;
export const { reset: resetGetCouriersForOrders } = actions;
export default reducer;
