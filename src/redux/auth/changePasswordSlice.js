import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "changePassword",
  actionType: "Auth/changePassword",
  request: async ({ newPassword, newPasswordConfirm }) =>
    (
      await api.put("Users/UpdateUserPasswordByUserId", {
        newPassword,
        newPasswordConfirm,
      })
    ).data,
});

export const changePassword = thunk;
export const { resetState: resetChangePassword } = actions;
export default reducer;
