import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateUserLock",
  actionType: "Users/UpdateUserLock",
  request: async (data) => {
    // Backend binds UpdateUserLockDTO from body only — no query params.
    const res = await api.put("Users/UpdateUserLock", { ...data });
    return res.data;
  },
});

export const updateUserLock = thunk;
export const { reset: resetUpdateUserLock } = actions;
export default reducer;
