import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getTicketCountStatistics",
  actionType: "Statistics/GetTicketCountStatistics",
  request: async (data) =>
    (
      await api.get("Statistics/GetTicketCountStatistics", {
        params: { ...data },
      })
    ).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getTicketCountStatistics = thunk;
export const { reset: resetGetTicketCountStatistics } = actions;
export default reducer;
