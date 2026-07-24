import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

  // Trendyol names this transition TicketShipped (TicketPrepared also exists
  // backend-side; both are valid — probe-verified 2026-07-24).
const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekTicketPrepare",
  actionType: "Trendyol/TicketShipped",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("Trendyol/TicketShipped", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const trendyolYemekTicketPrepare = thunk;
export const { reset: resetTrendyolYemekTicketPrepare } = actions;
export default reducer;
