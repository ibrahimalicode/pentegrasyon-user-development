import { combineReducers } from "@reduxjs/toolkit";
import getOrdersSlice from "./getOrdersSlice";
import updateTicketStatusSlice from "./updateTicketStatusSlice";
import updateTicketAutomationVariableSlice from "./updateTicketAutomationVariableSlice";
import getAutomaticApprovalVariableSlice from "./getAutomaticApprovalVariableSlice";
import getOnTheWayTimeVariableSlice from "./getOnTheWayTimeVariableSlice";
import getDeliveryTimeVariableSlice from "./getDeliveryTimeVariableSlice";
import updateOrderCourierSlice from "./updateOrderCourierSlice";
import getOrderCompensationSlice from "./getOrderCompensationSlice";

// Slices

const ordersSlice = combineReducers({
  get: getOrdersSlice,
  update: updateTicketStatusSlice,
  updateCourier: updateOrderCourierSlice,
  getAutoApprovalVar: getAutomaticApprovalVariableSlice,
  getOnTheWayTimeVar: getOnTheWayTimeVariableSlice,
  getDeliveryTimeVar: getDeliveryTimeVariableSlice,
  updateAutomationVars: updateTicketAutomationVariableSlice,
  getOrderCompensation: getOrderCompensationSlice,
});

export default ordersSlice;
