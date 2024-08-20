import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getUsersSlice from "./getUsersSlice";
import getUserByIdSlice from "./getUserByIdSlice";
import addUserSlice from "./addUserSlice";
import deleteUserSlice from "./deleteUserSlice";
import updateUserDataByIdSlice from "./updateUserDataByIdSlice";
import adduserInvoiceSlice from "./adduserInvoiceSlice";
import updateUserInvoiceSlice from "./updateUserInvoiceSlice";
import updateUserPasswordSlice from "./updateUserPasswordSlice";
import updateUserIsActiveSlice from "./updateUserIsActiveSlice";
import updateUserIsVerifiedSlice from "./updateUserIsVerifiedSlice";

const usersSlice = combineReducers({
  getUsers: getUsersSlice,
  getUser: getUserByIdSlice,
  addUser: addUserSlice,
  delete: deleteUserSlice,
  updateUser: updateUserDataByIdSlice,
  addInvoice: adduserInvoiceSlice,
  updateInvoice: updateUserInvoiceSlice,
  updatePassword: updateUserPasswordSlice,
  updateIsActive: updateUserIsActiveSlice,
  updateIsVerified: updateUserIsVerifiedSlice,
});

export default usersSlice;
