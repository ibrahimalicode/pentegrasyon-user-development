import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateUserPassword",
  actionType: "Users/updateUserPassword",
  request: async ({ newPassword, newPasswordConfirm }) =>
    (
      await api.put("Users/UpdateUserPasswordByUserId", {
        newPassword,
        newPasswordConfirm,
      })
    ).data,
});

export const updateUserPassword = thunk;
export const {
  reset: resetUpdateUserPassword,
  resetState: resetUpdateUserPasswordState,
} = actions;
export default reducer;
