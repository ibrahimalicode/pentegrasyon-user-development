import api from "../api";
import { createApiSlice } from "../createApiSlice";

const { thunk, reducer, actions } = createApiSlice({
  name: "forgotPassword",
  actionType: "Auth/forgotPassword",
  request: async ({ toAddress, isEmail }) => {
    const API = isEmail
      ? "Email/SendEmailPasswordReset"
      : "SMS/SendSMSPasswordReset";
    // POST since backend PR #170 — the recipient no longer travels in the URL.
    const res = await api.post(API, {
      [isEmail ? "toAddress" : "phoneNumber"]: toAddress,
    });
    return res.data;
  },
});

export const forgotPassword = thunk;
export const { resetState: resetForgotPassword } = actions;
export default reducer;
