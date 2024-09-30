import { combineReducers } from "@reduxjs/toolkit";
import getOrdersSlice from "./getOrdersSlice";
import updateTicketStatusSlice from "./updateTicketStatusSlice";
import getTicketAutomationVariableSlice from "./getTicketAutomationVariableSlice";
import updateTicketAutomationVariableSlice from "./updateTicketAutomationVariableSlice";

// Slices

const ordersSlice = combineReducers({
  get: getOrdersSlice,
  update: updateTicketStatusSlice,
  getAutomationVars: getTicketAutomationVariableSlice,
  updateAutomationVars: updateTicketAutomationVariableSlice,
});

export default ordersSlice;
