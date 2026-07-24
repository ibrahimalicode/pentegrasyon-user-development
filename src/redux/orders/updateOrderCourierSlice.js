import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateOrderCourier",
  actionType: "Tickets/UpdateOrderCourier",
  request: async (data) =>
    (
      await api.put(
        "Tickets/UpdateTicketCourier",
        { ...data },
        { params: { ...data } }
      )
    ).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const updateOrderCourier = thunk;
export const { reset: resetUpdateOrderCourier } = actions;
export default reducer;
