import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getirYemekTicketVerify",
  actionType: "GetirYemek/TicketVerify",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("GetirYemek/TicketVerify", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const getirYemekTicketVerify = thunk;
export const { reset: resetGetirYemekTicketVerify } = actions;
export default reducer;
