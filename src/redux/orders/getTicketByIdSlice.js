import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getTicketById",
  actionType: "Tickets/GetTicketById",
  dataKey: "ticket",
  request: async (data) =>
    (
      await api.get("Tickets/GetTicketById", {
        params: data,
      })
    ).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getTicketById = thunk;
export const { resetState: resetGetTicketByIdState, reset: resetGetTicketById } =
  actions;
export default reducer;
