import { combineReducers } from "@reduxjs/toolkit";

//Slices
import getAdminSlice from "./getAdminSlice";
import updateAdminDataSlice from "./updateAdminDataSlice";

const adminSlice = combineReducers({
  getAdmin: getAdminSlice,
  updateAdminData: updateAdminDataSlice,
});

export default adminSlice;
