import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekGetTicketCancelOptions",
  actionType: "Trendyol/TicketCancelOptions",
  dataKey: "options",
  request: async (data) =>
    (await api.get("Trendyol/TicketCancelOptions", { params: { ...data } }))
      .data.data,
});

export const trendyolYemekGetTicketCancelOptions = thunk;
export const { reset: resetTrendyolYemekGetTicketCancelOptions } = actions;
export default reducer;
