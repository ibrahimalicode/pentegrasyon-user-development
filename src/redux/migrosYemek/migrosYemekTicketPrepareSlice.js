import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekTicketPrepare",
  actionType: "MigrosYemek/TicketPrepare",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("MigrosYemek/TicketPrepare", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const migrosYemekTicketPrepare = thunk;
export const { reset: resetMigrosYemekTicketPrepare } = actions;
export default reducer;
