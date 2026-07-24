import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getAutomationVariables",
  actionType: "Tickets/GetAutomationVariables",
  request: async () => (await api.get("Tickets/GetAutomationVariables")).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getAutomationVariables = thunk;
export const { reset: resetGetAutomationVariables } = actions;
export default reducer;
