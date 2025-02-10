import { combineReducers } from "@reduxjs/toolkit";
import sendSMSUserLockPasswordResetSlice from "./sendSMSUserLockPasswordResetSlice";

const smsSlice = combineReducers({
  sendLockPass: sendSMSUserLockPasswordResetSlice,
});

export default smsSlice;
