import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "yemekSepetiGetTicketCancelOptions",
  actionType: "YemekSepeti/TicketCancelOptions",
  dataKey: "options",
  request: async (data) =>
    (await api.get("YemekSepeti/TicketCancelOptions", { params: { ...data } }))
      .data.data,
});

export const yemekSepetiGetTicketCancelOptions = thunk;
export const { reset: resetYemekSepetiGetTicketCancelOptions } = actions;
export default reducer;
