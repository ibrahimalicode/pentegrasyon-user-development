import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getPaymentsSlice from "./getPaymentsSlice";

const paymentsSlice = combineReducers({
  get: getPaymentsSlice,
});

export default paymentsSlice;
