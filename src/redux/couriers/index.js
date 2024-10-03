import { combineReducers } from "@reduxjs/toolkit";
import getCouriersSlice from "./getCouriersSlice";
import updateCouriersSlice from "./updateCouriersSlice";
import addCourierSlice from "./addCourierSlice";
import deleteCourierSlice from "./deleteCourierSlice";
import updateCourierLoginCodeSlice from "./updateCourierLoginCodeSlice";

// Slices
const couriersSlice = combineReducers({
  get: getCouriersSlice,
  update: updateCouriersSlice,
  add: addCourierSlice,
  delete: deleteCourierSlice,
  updateLoginCode: updateCourierLoginCodeSlice,
});

export default couriersSlice;
