import { combineReducers } from "@reduxjs/toolkit";
import getCouriersSlice from "./getCouriersSlice";
import updateCouriersSlice from "./updateCouriersSlice";
import addCourierSlice from "./addCourierSlice";
import deleteCourierSlice from "./deleteCourierSlice";
import updateCourierLoginCodeSlice from "./updateCourierLoginCodeSlice";
import getAvailableCouriersSlice from "./getAvailableCouriersSlice";
import generateLoginCodeSlice from "./generateLoginCodeSlice";

// Slices
const couriersSlice = combineReducers({
  get: getCouriersSlice,
  update: updateCouriersSlice,
  add: addCourierSlice,
  delete: deleteCourierSlice,
  updateLoginCode: updateCourierLoginCodeSlice,
  getOnlineCouriers: getAvailableCouriersSlice,
  generateCode: generateLoginCodeSlice,
});

export default couriersSlice;
