import { combineReducers } from "@reduxjs/toolkit";
import getAdvertsSlice from "./getAdvertsSlice";
const advertsSlice = combineReducers({
  get: getAdvertsSlice,
});

export default advertsSlice;
