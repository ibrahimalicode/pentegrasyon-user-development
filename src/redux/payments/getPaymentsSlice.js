import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getPayments",
  actionType: "Payments/GetPayments",
  dataKey: "payments",
  request: async (data) =>
    (await api.get("Payments/GetPayments", { params: data })).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getPayments = thunk;
export const { reset: resetGetPayments } = actions;
export default reducer;
