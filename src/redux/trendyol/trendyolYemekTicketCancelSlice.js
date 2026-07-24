import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekTicketCancel",
  actionType: "Trendyol/TicketCancel",
  request: async (data) => {
    console.log(data);
    // cancel additionally sends the cancel-reason DTO in the body;
    // backend still binds ticketId/onlyInDatabase from query
    const res = await api.post("Trendyol/TicketCancel", { ...data }, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const trendyolYemekTicketCancel = thunk;
export const { reset: resetTrendyolYemekTicketCancel } = actions;
export default reducer;
