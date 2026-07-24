import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getOrders",
  actionType: "Tickets/GetTickets",
  dataKey: "orders",
  request: async (data) => {
    const res = await api.get("Tickets/GetTickets", {
      params: data,
    });

    const orders = res.data.data;

    const withCourier = orders.filter(
      (O) =>
        O.courierTypeId === 0 &&
        O.courierId &&
        O.courierId !== "00000000-0000-0000-0000-000000000000"
    );

    const uniqueCourierIds = [...new Set(withCourier.map((o) => o.courierId))];

    const courierMap = new Map();

    await Promise.all(
      uniqueCourierIds.map(async (id) => {
        try {
          const courierRes = await api.get("Couriers/GetCourierById", {
            params: { courierId: id },
          });
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
  },
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getOrders = thunk;
export const { resetState: resetGetOrdersState, reset: resetGetOrders } =
  actions;
export default reducer;
