import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "Logout",
  actionType: "Auth/UserLogout",
  request: async ({ userSessionId }) =>
    (
      await api.delete("UserSessions/DeleteUserSessionById", {
        params: { userSessionId },
      })
    ).data,
});

export const logout = thunk;
export const { resetState: resetLogoutState } = actions;
export default reducer;
