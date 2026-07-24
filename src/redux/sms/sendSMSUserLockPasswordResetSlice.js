import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "sendSMSUserLockPasswordReset",
  actionType: "GeneralVariables/SendSMSUserLockPasswordReset",
  dataKey: "smsParameters",
  request: async () =>
    // POST since backend PR #170 — side-effectful GETs were re-fireable by
    // prefetchers/retries. Identity comes from the JWT; no body needed.
    (await api.post("SMS/SendSMSUserLockPasswordReset")).data.data,
});

export const sendSMSUserLockPasswordReset = thunk;
export const { reset: resetSendSMSUserLockPasswordReset } = actions;
export default reducer;
