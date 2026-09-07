import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getUserReportSlice from "./getUserReportSlice";

const reportsSlice = combineReducers({
  getUserReport: getUserReportSlice,
});

export default reportsSlice;
