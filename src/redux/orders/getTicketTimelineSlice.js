import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

// Slim 24h order timeline for the dashboard chart (backend #224).
// Window: lastHours 1-24 (default 24) or startDateTime/endDateTime;
// rows carry no customer/lines — just ids, timestamps, status, amount.
const { thunk, reducer, actions } = createApiSlice({
  name: "getTicketTimeline",
  actionType: "Tickets/GetTicketTimeline",
  request: async (data) =>
    (
      await api.get("Tickets/GetTicketTimeline", {
        params: { ...data },
      })
    ).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getTicketTimeline = thunk;
export const { reset: resetGetTicketTimeline } = actions;
export default reducer;
