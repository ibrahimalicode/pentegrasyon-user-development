import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekGetTicketCancelOptions",
  actionType: "MigrosYemek/TicketCancelOptions",
  dataKey: "options",
  // NOTE: unwrapped three levels (res.data.data.data) — the MigrosYemek
  // cancel-options payload is double-wrapped by the backend. Preserved.
  request: async (data) =>
    (await api.get("MigrosYemek/TicketCancelOptions", { params: { ...data } }))
      .data.data.data,
});

export const migrosYemekGetTicketCancelOptions = thunk;
export const { reset: resetMigrosYemekGetTicketCancelOptions } = actions;
export default reducer;
