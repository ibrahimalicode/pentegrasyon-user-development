import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getUserSlice from "./getUserSlice";
import updateUserDataSlice from "./updateUserDataSlice";

const userSlice = combineReducers({
  getUser: getUserSlice,
  updateUserData: updateUserDataSlice,
});

export default userSlice;
