import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekTicketDeliver",
  actionType: "Trendyol/TicketDeliver",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("Trendyol/TicketDeliver", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const trendyolYemekTicketDeliver = thunk;
export const { reset: resetTrendyolYemekTicketDeliver } = actions;
export default reducer;
