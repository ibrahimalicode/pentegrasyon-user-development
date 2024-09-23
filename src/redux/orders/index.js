import { combineReducers } from "@reduxjs/toolkit";
import getOrdersSlice from "./getOrdersSlice";

// Slices

const ordersSlice = combineReducers({
  get: getOrdersSlice,
});

export default ordersSlice;
