import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getLogs",
  actionType: "ActivityLog/GetActivityLogs",
  dataKey: "logs",
  request: async (data) =>
    (
      await api.get("ActivityLog/GetActivityLogs", {
        params: data,
      })
    ).data.data,
});

export const getLogs = thunk;
export const { reset: resetGetLogs } = actions;
export default reducer;
