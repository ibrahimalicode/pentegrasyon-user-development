import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "sendEmailUserLockPasswordReset",
  actionType: "GeneralVariables/sendEmailUserLockPasswordReset",
  dataKey: "smsParameters",
  request: async () =>
    // POST since backend PR #170 — side-effectful GETs were re-fireable by
    // prefetchers/retries. Identity comes from the JWT; no body needed.
    (await api.post("Email/sendEmailUserLockPasswordReset")).data.data,
});

export const sendEmailUserLockPasswordReset = thunk;
export const { reset: resetSendEmailUserLockPasswordReset } = actions;
export default reducer;
