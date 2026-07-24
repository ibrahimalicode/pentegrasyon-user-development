//https://api.pentegrasyon.net:9007/api/v1/user/getUser

import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getUser",
  actionType: "Users/GetUser",
  dataKey: "user",
  request: async () => (await api.get("Users/GetUser"))?.data?.data,
});

export const getUser = thunk;
export const { resetState: resetGetUserState, reset: resetGetUser } = actions;
export default reducer;
