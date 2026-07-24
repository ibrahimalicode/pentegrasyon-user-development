import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getirYemekTicketDeliver",
  actionType: "GetirYemek/TicketDeliver",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("GetirYemek/TicketDeliver", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const getirYemekTicketDeliver = thunk;
export const { reset: resetGetirYemekTicketDeliver } = actions;
export default reducer;
