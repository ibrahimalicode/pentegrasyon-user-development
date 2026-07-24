import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekTicketCancel",
  actionType: "MigrosYemek/TicketCancel",
  request: async (data) => {
    console.log(data);
    // cancel additionally sends the cancel-reason DTO in the body;
    // backend still binds ticketId/onlyInDatabase from query
    const res = await api.post("MigrosYemek/TicketCancel", { ...data }, {
      params: { ...data },
    });
    return res.data;
  },
  // orders UI shows the failure on the right row via error.ticketId
  mapRejected: (payload, arg) => ({ ...payload, ticketId: arg.ticketId }),
});

export const migrosYemekTicketCancel = thunk;
export const { reset: resetMigrosYemekTicketCancel } = actions;
export default reducer;
