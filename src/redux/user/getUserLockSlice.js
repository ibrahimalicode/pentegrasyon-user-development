//https://api.pentegrasyon.net:9007/api/v1/user/getUserLock

import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getUserLock",
  actionType: "Users/GetUserLock",
  request: async () => (await api.get("Users/GetUserLock"))?.data?.data,
});

export const getUserLock = thunk;
export const { reset: resetGetUserLock } = actions;
export default reducer;
