import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateMessageStatus",
  actionType: "Messages/UpdateMessageRecipientIsRead",
  request: async (data) => {
    const results = [];
    for (const message of data) {
      if (!message.isRead) {
        const res = await api.put(
          "Messages/UpdateMessageRecipientIsRead",
          {},
          {
            params: {
              messageRecipientId: message.messageRecipientId,
              isRead: true,
            },
          }
        );
        results.push({ ...res.data, message });
      }
    }

    return results;
  },
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const updateMessageStatus = thunk;
export const { reset: resetUpdateMessageStatus } = actions;
export default reducer;
