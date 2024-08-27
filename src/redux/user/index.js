import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getUserSlice from "./getUserSlice";
import updateUserDataSlice from "./updateUserDataSlice";
import updateUserInvoiceSlice from "./updateUserInvoiceSlice";
import addUserInvoiceSlice from "./addUserInvoiceSlice";
import updateUserPasswordSlice from "./updateUserPasswordSlice";

const userSlice = combineReducers({
  getUser: getUserSlice,
  updateUserData: updateUserDataSlice,
  updateInvoice: updateUserInvoiceSlice,
  addInvoice: addUserInvoiceSlice,
  updatePassword: updateUserPasswordSlice,
});

export default userSlice;
