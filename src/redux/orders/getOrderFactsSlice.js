import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

// Slim 13-month order-facts rows for the 30-day analysis (backend #231).
// PaginationBase is the TOP-LEVEL envelope here (totalCount/data[]), unlike
// the ResponseBase.data shape of the ticket endpoints. Facts sync nightly
// at 02:30, so "today" is complete only up to the last sync.
const { thunk, reducer, actions } = createApiSlice({
  name: "getOrderFacts",
  actionType: "OrderFacts/GetOrderFacts",
  request: async (data) =>
    (
      await api.get("OrderFacts/GetOrderFacts", {
        params: data,
      })
    ).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getOrderFacts = thunk;
export const { reset: resetGetOrderFacts } = actions;
export default reducer;
