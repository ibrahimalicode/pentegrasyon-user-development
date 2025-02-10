import { combineReducers } from "@reduxjs/toolkit";
import sendEmailUserLockPasswordResetSlice from "./sendEmailUserLockPasswordResetSlice";

const emailSlice = combineReducers({
  sendLockPass: sendEmailUserLockPasswordResetSlice,
});

export default emailSlice;
