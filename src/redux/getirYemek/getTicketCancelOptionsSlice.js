import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getTicketCancelOptions",
  actionType: "GetirYemek/TicketCancelOptions",
  dataKey: "options",
  request: async (data) =>
    (await api.get("GetirYemek/TicketCancelOptions", { params: { ...data } }))
      .data.data,
});

export const getTicketCancelOptions = thunk;
export const { reset: resetGetTicketCancelOptions } = actions;
export default reducer;
