import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekTicketDeliver",
  actionType: "MigrosYemek/TicketDeliver",
  request: async (data) => {
    // backend binds these POSTs entirely from query; body stays empty
    const res = await api.post("MigrosYemek/TicketDeliver", {}, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const migrosYemekTicketDeliver = thunk;
export const { reset: resetMigrosYemekTicketDeliver } = actions;
export default reducer;
