import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getOrderCompensation",
  actionType: "Tickets/GetTicGetTicketCourierCompensationAssignmentket",
  dataKey: "compensationData",
  request: async (data) =>
    (
      await api.get("Tickets/GetTicketCourierCompensationAssignment", {
        params: { ...data },
      })
    ).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getOrderCompensation = thunk;
export const { reset: resetGetOrderCompensation } = actions;
export default reducer;
