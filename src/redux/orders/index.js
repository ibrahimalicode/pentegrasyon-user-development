import { combineReducers } from "@reduxjs/toolkit";
import getOrdersSlice from "./getOrdersSlice";
import updateTicketStatusSlice from "./updateTicketStatusSlice";
import updateTicketAutomationVariableSlice from "./updateTicketAutomationVariableSlice";
import getAutomaticApprovalVariableSlice from "./getAutomaticApprovalVariableSlice";
import getOnTheWayTimeVariableSlice from "./getOnTheWayTimeVariableSlice";
import getDeliveryTimeVariableSlice from "./getDeliveryTimeVariableSlice";

// Slices

const ordersSlice = combineReducers({
  get: getOrdersSlice,
  update: updateTicketStatusSlice,
  getAutoApprovalVar: getAutomaticApprovalVariableSlice,
  getOnTheWayTimeVar: getOnTheWayTimeVariableSlice,
  getDeliveryTimeVar: getDeliveryTimeVariableSlice,
  updateAutomationVars: updateTicketAutomationVariableSlice,
});

export default ordersSlice;
