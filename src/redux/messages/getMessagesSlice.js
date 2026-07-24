import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getMessages",
  actionType: "Messages/GetMessagesByUser",
  dataKey: "messages",
  request: async () => (await api.get("Messages/GetMessagesByUser")).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getMessages = thunk;
export const { reset: resetGetMessages } = actions;
export default reducer;
