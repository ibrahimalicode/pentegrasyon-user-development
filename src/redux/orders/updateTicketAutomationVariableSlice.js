import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateTicketAutomationVariable",
  actionType: "Tickets/UpdateTicketAutomationVariable",
  dataKey: "automationVariables",
  request: async (data) =>
    (
      await api.put(
        "Tickets/UpdateTicketAutomationVariable",
        { ...data },
        { params: { ...data } }
      )
    ).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const updateTicketAutomationVariable = thunk;
export const { reset: resetUpdateTicketAutomationVariable } = actions;
export default reducer;
