import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getLogsSlice from "./getLogsSlice";
import deleteLogsByDateRangeSlice from "./deleteLogsByDateRangeSlice";
import deleteLogsByIdsSlice from "./deleteLogsByIdsSlice";

const logsSlice = combineReducers({
  get: getLogsSlice,
  deleteByDateRange: deleteLogsByDateRangeSlice,
  deleteByIds: deleteLogsByIdsSlice,
});

export default logsSlice;
