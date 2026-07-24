import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getOrderStatistics",
  actionType: "Statistics/GetTicketStatistics",
  request: async (data) =>
    (
      await api.get("Statistics/GetTicketStatistics", {
        params: { ...data },
      })
    ).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getOrderStatistics = thunk;
export const { reset: resetGetOrderStatistics } = actions;
export default reducer;
