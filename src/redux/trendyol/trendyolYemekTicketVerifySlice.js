import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekTicketVerify",
  actionType: "Trendyol/TicketVerify",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("Trendyol/TicketVerify", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const trendyolYemekTicketVerify = thunk;
export const { reset: resetTrendyolYemekTicketVerify } = actions;
export default reducer;
